"use client";

import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../store/useThemeStore";
import { useMinecraftAuthStore } from "../../store/minecraft-auth-store";
import { useWelcomeStore } from "../../store/welcome-store";
import { useAddMinecraftAccount } from "../../hooks/useAddMinecraftAccount";
import { HeaderBar } from "../layout/AppLayout";
import { getVariantColors } from "../ui/design-system";

export function WelcomeScreen() {
  const { t } = useTranslation();
  const accentColor = useThemeStore((s) => s.accentColor);
  const colors = getVariantColors("3d", accentColor);
  const isLoading = useMinecraftAuthStore((s) => s.isLoading);
  const skip = useWelcomeStore((s) => s.skip);
  const { startLogin } = useAddMinecraftAccount();

  return (
    <div className="fixed inset-0 z-[900] flex flex-col bg-[#0b0c10] select-none overflow-hidden">
      {/* 1:1 matching Launcher Header Bar */}
      <HeaderBar />

      {/* Subtle glass separator */}
      <div
        className="w-full h-[1px] pointer-events-none z-20"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)`,
        }}
      />

      {/* Fullscreen Lunar Client Atmospheric Minecraft Shader Background */}
      <div
        className="flex-1 relative flex items-center justify-center p-6 md:p-10 overflow-hidden"
        style={{
          backgroundImage: "url('/lunar-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Soft cinematic vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(8, 10, 16, 0.35) 0%, rgba(5, 7, 12, 0.88) 100%)",
          }}
        />

        {/* Dynamic accent glow behind the login card */}
        <div
          aria-hidden
          className="absolute w-[560px] h-[560px] rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: colors.main }}
        />

        {/* Centered Lunar Client Style Login Card */}
        <div className="relative z-10 w-full max-w-[420px]">
          <div className="flex flex-col items-center text-center p-8 md:p-9 rounded-2xl md:rounded-3xl bg-[#0c0e15]/90 backdrop-blur-xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.22)]">
            {/* Vace Client Glowing Brand Icon */}
            <div className="relative mb-3 flex items-center justify-center">
              <div
                className="absolute w-20 h-20 rounded-full blur-xl opacity-40 pointer-events-none"
                style={{ background: colors.main }}
              />
              <img
                src="/v.png"
                alt="Vace Client Logo"
                className="w-20 h-20 object-contain relative z-10 select-none pointer-events-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:scale-105"
              />
            </div>

            {/* Title & Tagline */}
            <h1 className="text-3xl font-black text-white font-smallcaps tracking-wider drop-shadow-md">
              Vace Client
            </h1>
            <p className="mt-1 text-xs text-white/70 max-w-xs leading-relaxed font-medium">
              {t("welcome.panel.subtitle", "Melde dich mit deinem Microsoft-Account an oder starte direkt offline.")}
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-3.5 mt-7">
              {/* Microsoft Login Button in Lunar Client Style */}
              <button
                onClick={startLogin}
                disabled={isLoading}
                className="relative group w-full h-[52px] rounded-xl flex items-center justify-center gap-3 text-sm font-black font-smallcaps uppercase tracking-wider text-white select-none transition-all duration-75 active:translate-y-[1px] disabled:opacity-50 cursor-pointer shadow-lg"
                style={{
                  backgroundColor: `${colors.main}35`,
                  borderColor: `${colors.main}70`,
                  borderBottomColor: colors.dark,
                  borderWidth: "2px",
                  borderBottomWidth: "4px",
                  boxShadow: `0 4px 0 rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 ${colors.light}50, inset 0 0 0 1px ${colors.main}20`,
                }}
              >
                {isLoading ? (
                  <Icon icon="svg-spinners:ring-resize" className="w-5 h-5 text-white" />
                ) : (
                  <div className="grid grid-cols-2 gap-1 w-4 h-4 flex-shrink-0 drop-shadow">
                    <span className="w-1.5 h-1.5 bg-[#f25022] rounded-[1px]" />
                    <span className="w-1.5 h-1.5 bg-[#7fba00] rounded-[1px]" />
                    <span className="w-1.5 h-1.5 bg-[#00a4ef] rounded-[1px]" />
                    <span className="w-1.5 h-1.5 bg-[#ffb900] rounded-[1px]" />
                  </div>
                )}
                <span className="drop-shadow">
                  {isLoading ? t("welcome.panel.cta_loading", "Wird angemeldet...") : t("welcome.panel.cta", "Mit Microsoft anmelden")}
                </span>
              </button>

              {/* Offline / Play as Guest Button */}
              <button
                onClick={skip}
                disabled={isLoading}
                className="w-full h-[44px] rounded-xl flex items-center justify-center gap-2 text-xs font-bold font-smallcaps uppercase tracking-wider text-white/80 hover:text-white transition-all duration-75 active:translate-y-[1px] select-none cursor-pointer border border-b-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  borderBottomColor: "rgba(0, 0, 0, 0.4)",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <Icon icon="solar:user-bold" className="w-4 h-4 text-white/70" />
                <span>{t("welcome.panel.skip", "Ohne Account fortfahren")}</span>
              </button>
            </div>

            {/* Footnote */}
            <p className="mt-6 pt-4 border-t border-white/10 text-[10px] text-white/35 leading-tight">
              {t("welcome.panel.footnote", "VaceClient steht in keiner Verbindung zu Mojang oder Microsoft.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
