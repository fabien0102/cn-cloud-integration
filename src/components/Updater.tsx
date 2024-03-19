import { UnlistenFn } from "@tauri-apps/api/event";
import {
  checkUpdate,
  onUpdaterEvent,
  installUpdate,
  UpdateStatus,
} from "@tauri-apps/api/updater";
import {
  Show,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

export function Updater() {
  const [status, setStatus] = createSignal<UpdateStatus>();
  const [error, setError] = createSignal<string>();

  let unlisten: UnlistenFn | undefined;

  onMount(async () => {
    unlisten = await onUpdaterEvent(({ error, status }) => {
      setStatus(status);
      setError(error);
    });
  });

  onCleanup(() => {
    if (typeof unlisten === "function") {
      unlisten();
    }
  });

  const [update, { refetch }] = createResource(checkUpdate);

  createEffect(() => {
    console.log(update()?.manifest);
  });

  return (
    <>
      status: {status()}
      <Show when={update()?.shouldUpdate}>
        <div>Update available!</div>
        <button onClick={installUpdate}>Update now</button>
      </Show>
      <button onClick={refetch}>Check for update</button>
    </>
  );
}
