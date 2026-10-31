"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "../../lib/utils";
import { useThemeStore } from "../../store/useThemeStore";

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
      {/* Launcher dock matching 1:1 Launch Game Button 3D aesthetic */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#0b0e17]/95 border border-white/20 shadow-[0_14px_44px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.2)] select-none">
        {mainItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id, item.isAction, item.action)}
              className={cn(
                "relative group flex items-center gap-2.5 px-4 h-[44px] rounded-xl text-xs font-black tracking-wider transition-all duration-75 select-none cursor-pointer",
                isActive
                  ? "text-white active:translate-y-[2px]"
                  : "text-white/70 hover:text-white active:translate-y-[1px]",
              )}
              style={
                isActive
                  ? {
                      background: accentColor.value,
                      border: "1px solid rgba(255, 255, 255, 0.35)",
                      borderBottom: "4px solid rgba(0, 0, 0, 0.45)",
                      boxShadow: `0 4px 0 rgba(0,0,0,0.3), 0 6px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255, 255, 255, 0.45)`,
                    }
                  : {
                      background: "rgba(22, 26, 38, 0.85)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderBottom: "3px solid rgba(0, 0, 0, 0.45)",
                      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                    }
              }
              title={item.label}
            >
              <Icon
                icon={item.icon}
                className={cn(
                  "w-4.5 h-4.5 transition-transform duration-150 text-white",
                  isActive ? "scale-105 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "group-hover:scale-110",
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
            <div className="h-6 w-[1px] bg-white/20 mx-1" />
            {actionItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.isAction, item.action)}
                className="relative group flex items-center gap-2 px-3.5 h-[44px] rounded-xl text-xs font-bold tracking-wider text-white/70 hover:text-white transition-all duration-75 select-none active:translate-y-[1px] cursor-pointer"
                style={{
                  background: "rgba(22, 26, 38, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderBottom: "3px solid rgba(0, 0, 0, 0.45)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                }}
                title={item.label}
              >
                <Icon
                  icon={item.icon}
                  className="w-4.5 h-4.5 transition-transform duration-200 group-hover:rotate-45 text-white/80 group-hover:text-white"
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
