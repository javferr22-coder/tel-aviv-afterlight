import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

// The game is a self-contained HTML file served from public/game/; it runs
// unchanged inside a same-origin frame so its globals, inline menus,
// localStorage saves and pointer lock all keep working.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GTA 6: Tel Aviv — Open-World Browser Game" },
      {
        name: "description",
        content:
          "Drive, fight and build your empire in a sun-soaked Tel Aviv. Crew jobs, police chases, heists and the Uprising — right in your browser.",
      },
      { property: "og:title", content: "GTA 6: Tel Aviv — Open-World Browser Game" },
      {
        property: "og:description",
        content:
          "Drive, fight and build your empire in a sun-soaked Tel Aviv. Crew jobs, police chases, heists and the Uprising.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const focus = () => el.contentWindow?.focus();
    el.addEventListener("load", focus);
    focus();
    return () => el.removeEventListener("load", focus);
  }, []);

  return (
    <main className="fixed inset-0 bg-stage">
      <iframe
        ref={frame}
        src="/game/index.html"
        title="GTA 6: Tel Aviv"
        allow="autoplay; fullscreen; pointer-lock"
        className="block h-full w-full border-0"
      />
    </main>
  );
}
