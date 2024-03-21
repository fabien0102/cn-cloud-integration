import { UnlistenFn } from "@tauri-apps/api/event";
import {
  checkUpdate,
  onUpdaterEvent,
  installUpdate,
  UpdateStatus,
} from "@tauri-apps/api/updater";
import {
  Match,
  Switch,
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
      <Switch>
        <Match when={status() === "PENDING"}>
          <div>Updating…</div>
          <button disabled>Update now</button>
        </Match>
        <Match when={status() === "DONE"}>
          <div>Et voilà!</div>
          <button disabled>Update now</button>
        </Match>
        <Match when={status() === "ERROR"}>Updater error: {error()}</Match>
        <Match when={update()?.shouldUpdate}>
          <div>Update available!</div>
          <button onClick={installUpdate}>Update now</button>
        </Match>
      </Switch>
      <button onClick={refetch}>Check for update</button>
    </>
  );
}
