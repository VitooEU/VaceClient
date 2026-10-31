"use client";

import { useSettingsModalStore } from "../../store/settings-modal-store";
import { useThemeStore } from "../../store/useThemeStore";
import { SettingsTab } from "../tabs/SettingsTab";
import { cn } from "../../lib/utils";

export function SettingsModal() {
  const { isOpen, close } = useSettingsModalStore();
  const accentColor = useThemeStore((state) => state.accentColor);

  return (
    <>
      {/* Blur Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-md z-[999] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
      />

      {/* Settings Panel — Transparentes Glas-Design mit Blur, passend zum Client */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full flex flex-col z-[1000]",
          "w-[90%] max-w-5xl",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          background: "rgba(10, 11, 16, 0.65)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "-16px 0 50px rgba(0, 0, 0, 0.8), inset 1px 0 0 rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(32px) saturate(1.8)",
          WebkitBackdropFilter: "blur(32px) saturate(1.8)",
        }}
      >
        {isOpen && <SettingsTab onClose={close} />}
      </div>
    </>
  );
}
