import { Show, createEffect, createSignal } from "solid-js";

/**
 * Do you want to announce something amazing to our customers?
 *
 * 1. Bump the `lastVersion`
 * 2. Write a new announcement (you can check `CHANGELOG.md` to help you)
 * 3. Publish a new version
 */
const lastVersion = "1.1.0";

export function WhatsNew() {
  const [hasUpdate, setHasUpdate] = createSignal(
    window.localStorage.getItem("hasUpdate")
  );

  createEffect(() => {
    const hasUpdateValue = hasUpdate();
    if (hasUpdateValue) {
      window.localStorage.setItem("hasUpdate", hasUpdateValue);
    }
  });

  return (
    <Show when={hasUpdate() !== lastVersion}>
      <div
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50vh",
          left: "50vw",
          padding: "24px",
          "background-color": "black",
          color: "white",
          border: "white 2px solid",
          "border-radius": "16px",
        }}
      >
        <h1>What's new?</h1>
        <p>The real question would be, what's not new?</p>
        <p>Everything is new here!!!</p>
        <button onClick={() => setHasUpdate(lastVersion)}>Cool!</button>
      </div>
    </Show>
  );
}
