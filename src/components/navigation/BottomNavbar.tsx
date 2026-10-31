"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "../../lib/utils";
import { useThemeStore } from "../../store/useThemeStore";
import { getVariantColors } from "../ui/design-system";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  action?: () => void;
  isAction?: boolean;
}

interface BottomNavbarProps {
  className?: string;
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export function BottomNavbar({
  className,
  items,
  activeItem,
  onItemClick,
}: BottomNavbarProps) {
  const [active, setActive] = useState(activeItem || items[0]?.id);
  const accentColor = useThemeStore((state) => state.accentColor);
  const showNavLabels = useThemeStore((state) => state.showNavLabels);
  const colors = getVariantColors("3d", accentColor);

  useEffect(() => {
    if (activeItem) {
      setActive(activeItem);
    }
  }, [activeItem]);

  const handleItemClick = (id: string, isAction?: boolean, action?: () => void) => {
    if (action) {
      action();
      return;
    }
    if (!isAction) setActive(id);
    if (onItemClick) {
      onItemClick(id);
    }
  };

  const mainItems = items.filter((item) => !item.isAction);
  const actionItems = items.filter((item) => item.isAction);

  return (
    <nav
      aria-label="Hauptnavigation"
      className={cn(
        "z-40 flex items-center justify-center pointer-events-auto",
        className,
      )}
    >
      {/* Translucent glass dock with blur */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.14)] select-none">
        {mainItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id, item.isAction, item.action)}
              className={cn(
                "relative group flex items-center gap-2 px-3.5 h-[42px] !rounded-xl text-xs font-smallcaps font-black tracking-wider transition-all duration-75 select-none cursor-pointer active:translate-y-[1px] backdrop-blur-md",
                isActive
                  ? "border-2 border-b-4 text-white"
                  : "border border-b-2 text-white/75 hover:text-white hover:border-white/20",
              )}
              style={
                isActive
                  ? {
                      backgroundColor: `${colors.main}30`,
                      borderColor: `${colors.main}70`,
                      borderBottomColor: colors.dark,
                      boxShadow: `0 3px 0 rgba(0,0,0,0.3), 0 4px 12px ${colors.main}35, inset 0 1px 0 ${colors.light}50, inset 0 0 0 1px ${colors.main}20`,
                    }
                  : {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.10)",
                      borderBottomColor: "rgba(0, 0, 0, 0.35)",
                      boxShadow: "0 2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }
              }
              title={item.label}
            >
              <Icon
                icon={item.icon}
                className={cn(
                  "w-4 h-4 transition-transform duration-150",
                  isActive ? "text-white scale-105 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "text-white/80 group-hover:scale-110 group-hover:text-white",
                )}
              />
              {showNavLabels && (
                <span
                  className={cn(
                    "font-smallcaps tracking-wide text-xs transition-colors duration-150 uppercase",
                    isActive ? "font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "text-white/80 group-hover:text-white",
                  )}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

        {actionItems.length > 0 && (
          <>
            <div className="h-6 w-[1px] bg-white/15 mx-1" />
            {actionItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.isAction, item.action)}
                className="relative group flex items-center gap-2 px-3 h-[42px] !rounded-xl text-xs font-smallcaps font-bold tracking-wider text-white/75 hover:text-white border border-b-2 transition-all duration-75 select-none active:translate-y-[1px] cursor-pointer backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.10)",
                  borderBottomColor: "rgba(0, 0, 0, 0.35)",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                title={item.label}
              >
                <Icon
                  icon={item.icon}
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45 text-white/80 group-hover:text-white"
                />
                {showNavLabels && (
                  <span className="font-smallcaps tracking-wide text-xs text-white/80 group-hover:text-white uppercase">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  );
}
