"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../store/useThemeStore";
import { useMinecraftAuthStore } from "../../store/minecraft-auth-store";
import { useWelcomeStore } from "../../store/welcome-store";
import { useAddMinecraftAccount } from "../../hooks/useAddMinecraftAccount";
import { HeaderBar } from "../layout/AppLayout";

const HIGHLIGHTS = [
  { icon: "solar:widget-add-bold", key: "mods" },
  { icon: "solar:hanger-2-bold", key: "capes" },
  { icon: "solar:bolt-bold", key: "fps" },
  { icon: "solar:layers-bold", key: "versions" },
] as const;

export function WelcomeScreen() {
  const { t } = useTranslation();
  const accent = useThemeStore((s) => s.accentColor).value;
  const isLoading = useMinecraftAuthStore((s) => s.isLoading);
  const skip = useWelcomeStore((s) => s.skip);
  const { startLogin } = useAddMinecraftAccount();

  return (
    <div className="fixed inset-0 z-[900] flex flex-col bg-[#0d0e12] select-none overflow-hidden">
      {/* 1:1 identical Header Bar */}
      <HeaderBar />

      {/* Subtle divider separating header from content */}
      <div
        className="w-full h-[1px] pointer-events-none z-20"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 15%, rgba(255, 255, 255, 0.25) 85%, transparent 100%)`,
        }}
      />

      {/* Main content body with launcher background image */}
      <div
        className="flex-1 relative flex items-center justify-between p-10 md:p-14 overflow-hidden"
        style={{
          backgroundImage: "url('/launcher-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark contrast overlay - lightweight & zero GPU overhead */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0d0e12]/95 via-[#0d0e12]/80 to-[#0d0e12]/92"
        />

        {/* Ambient accent tint */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: accent }}
        />

        {/* Left: Hero Presentation */}
        <div className="relative z-10 flex flex-col justify-between max-w-xl h-full py-4">
          <div className="flex flex-col gap-3">
            <span
              className="text-xs font-bold tracking-widest uppercase font-smallcaps px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] w-fit shadow-sm"
              style={{ color: accent }}
            >
              Vace Client 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white font-smallcaps tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {t("welcome.hero.line1", "Entdecke Minecraft")}
              <br />
              <span style={{ color: accent }}>{t("welcome.hero.line2", "Neu Definiert.")}</span>
            </h1>
            <p className="text-white/60 text-sm max-w-md mt-1 leading-relaxed">
              Höchste Performance, exklusive Cosmetics und grenzenlose Mod-Unterstützung – alles in einem Client.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8 max-w-md">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.key}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#121520]/80 shadow-md"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${accent}25` }}
                >
                  <Icon icon={h.icon} className="w-4.5 h-4.5" style={{ color: accent }} />
                </div>
                <span className="text-xs font-bold text-white/85 tracking-wide">
                  {t(`welcome.highlight.${h.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sign-in Card */}
        <div className="relative z-10 w-full max-w-md ml-auto">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#0e111a]/95 border border-white/20 shadow-[0_16px_48px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <img
              src="/v.png"
              alt="Vace Logo"
              className="w-14 h-14 object-contain select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] mb-4"
            />

            <h2 className="text-2xl font-black text-white font-smallcaps tracking-wide">
              {t("welcome.panel.title", "Willkommen")}
            </h2>
            <p className="mt-1 text-xs text-white/60 leading-relaxed max-w-xs">
              {t("welcome.panel.subtitle", "Melde dich mit deinem Minecraft-Account an")}
            </p>

            <div className="w-full flex flex-col gap-3 mt-6">
              {/* Microsoft Login: Styled like Launch Game Button */}
              <button
                onClick={startLogin}
                disabled={isLoading}
                className="relative group w-full h-[52px] rounded-xl flex items-center justify-center gap-3 text-sm font-black font-smallcaps uppercase tracking-wider text-white select-none transition-all duration-75 active:translate-y-[2px] disabled:opacity-50 cursor-pointer shadow-lg"
                style={{
                  background: accent,
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  borderBottom: "4px solid rgba(0, 0, 0, 0.4)",
                  boxShadow: `0 4px 0 rgba(0,0,0,0.3), 0 6px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.45)`,
                }}
              >
                <Icon
                  icon={isLoading ? "svg-spinners:ring-resize" : "simple-icons:microsoft"}
                  className="w-5 h-5 text-white drop-shadow"
                />
                <span className="drop-shadow">
                  {isLoading ? t("welcome.panel.cta_loading", "Wird angemeldet...") : t("welcome.panel.cta", "Mit Microsoft anmelden")}
                </span>
              </button>

              {/* Skip / Offline button: Styled like tactile secondary launcher button */}
              <button
                onClick={skip}
                disabled={isLoading}
                className="w-full h-[44px] rounded-xl flex items-center justify-center gap-2 text-xs font-bold font-smallcaps uppercase tracking-wider text-white/75 hover:text-white bg-[#181c28]/90 hover:bg-[#222736] border border-white/10 hover:border-white/20 select-none transition-all duration-75 active:translate-y-[1px]"
                style={{
                  borderBottom: "3px solid rgba(0, 0, 0, 0.45)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                {t("welcome.panel.skip", "Ohne Account fortfahren")}
              </button>
            </div>

            <p className="mt-6 pt-4 border-t border-white/10 w-full text-[10px] text-white/35 leading-relaxed">
              {t("welcome.panel.footnote", "VaceClient steht in keiner Verbindung zu Mojang oder Microsoft.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
