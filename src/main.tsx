import "./polyfills";
import { initializeClipSupport, isLinux, isMacOS, isWindows } from "./utils/platform";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { router } from "./lib/router";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";
import { ClipOverlay } from "./components/overlay/ClipOverlay";
import i18n from "./i18n/i18n";
import "./styles/globals.css";

// ── Diagnostic Logging & Lag Detector ─────────────────────────
if (typeof window !== "undefined") {
  // Global error reporting to terminal
  window.addEventListener("error", (event) => {
    invoke("log_message_command", {
      level: "error",
      message: `❌ Unhandled error: ${event.message} at ${event.filename}:${event.lineno}`,
    }).catch(() => {});
  });

  window.addEventListener("unhandledrejection", (event) => {
    invoke("log_message_command", {
      level: "error",
      message: `❌ Unhandled rejection: ${String(event.reason)}`,
    }).catch(() => {});
  });

  // User click tracker
  window.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName.toLowerCase();
      const id = target.id ? `#${target.id}` : "";
      const cls = target.className && typeof target.className === "string" ? `.${target.className.trim().split(/\s+/)[0]}` : "";
      const text = (target.innerText || target.getAttribute("title") || "").slice(0, 30).trim();
      const label = [tag, id, cls].filter(Boolean).join("");
      invoke("log_message_command", {
        level: "info",
        message: `🖱️ [CLICK] ${label}${text ? ` "${text}"` : ""}`,
      }).catch(() => {});
    },
    true
  );

  // Main thread long-task lag monitor
  if (typeof PerformanceObserver !== "undefined") {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 40) {
            invoke("log_message_command", {
              level: "warn",
              message: `⚠️ [LAG DETECTED] Main thread blocked for ${Math.round(entry.duration)}ms!`,
            }).catch(() => {});
          }
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch {
      // Longtask observer not supported or restricted
    }
  }
}

if (typeof document !== "undefined") {
  if (isLinux()) {
    document.documentElement.classList.add("platform-linux");
  } else if (isMacOS()) {
    document.documentElement.classList.add("platform-macos");
  } else if (isWindows()) {
    document.documentElement.classList.add("platform-windows");
  }
}

const isOverlay = (() => {
  try {
    return getCurrentWindow().label === "clip-overlay";
  } catch {
    return false;
  }
})();

if (isOverlay) {
  document.documentElement.classList.add("overlay-window");
  document.documentElement.style.background = "transparent";
  document.body.style.background = "transparent";
}

const render = () => ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <I18nextProvider i18n={i18n}>
    {isOverlay ? <ClipOverlay /> : <RouterProvider router={router} />}
  </I18nextProvider>,
);

initializeClipSupport().catch((error) => console.error("Could not check clip support", error)).finally(render);
