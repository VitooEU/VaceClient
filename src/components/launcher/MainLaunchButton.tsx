"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { cn } from "../../lib/utils";
import { LaunchState } from "../../store/launch-state-store";
import { Button } from "../ui/buttons/Button";
import { IconButton } from "../ui/buttons/IconButton";
import { RolloutIndicator } from "./RolloutIndicator";

import { useThemeStore } from "../../store/useThemeStore";
import { useVersionSelectionStore } from "../../store/version-selection-store";
import { useProfileLaunch } from "../../hooks/useProfileLaunch";

interface Version {
  id: string;
  label: string;
  icon?: string;
  isCustom?: boolean;
  profileId?: string;
}

interface MainLaunchButtonProps {
  versions?: Version[];
  defaultVersion?: string;
  className?: string;
  onVersionChange?: (version: string) => void;
  maxWidth?: string;
  selectedVersionLabel?: string;
  mainButtonWidth?: string;
  mainButtonHeight?: string;
}

export function MainLaunchButton({
  defaultVersion,
  className,
  onVersionChange,
  versions,
  maxWidth = "340px",
  selectedVersionLabel,
  mainButtonWidth,
  mainButtonHeight,
}: MainLaunchButtonProps) {
  const { t } = useTranslation();
  const [transientSuccessActive, setTransientSuccessActive] = useState(false);

  const { selectedVersion, setSelectedVersion } = useVersionSelectionStore();
  const navigate = useNavigate();

  // Use the profile launch hook for launch logic
  const { handleLaunch: hookHandleLaunch, isLaunching, statusMessage, launchState } = useProfileLaunch({
    profileId: selectedVersion,
    onLaunchSuccess: () => {
      setTransientSuccessActive(true);
      setTimeout(() => {
        setTransientSuccessActive(false);
      }, 3000);
    },
    onLaunchError: (error: string) => {
      console.error("Launch error:", error);
    },
  });

  const isButtonLaunching = isLaunching;
  const buttonStatusMessage = statusMessage;

  useEffect(() => {
    const currentStoreVersion = selectedVersion;
    const storeVersionIsValidInProps = versions?.some(
      (v) => v.id === currentStoreVersion
    );

    if (defaultVersion) {
      if (
        !storeVersionIsValidInProps ||
        currentStoreVersion !== defaultVersion
      ) {
        const defaultVersionPropIsValidInProps = versions?.some(
          (v) => v.id === defaultVersion
        );
        if (defaultVersionPropIsValidInProps) {
          setSelectedVersion(defaultVersion);
        } else if (versions && versions.length > 0) {
          setSelectedVersion(versions[0].id);
        } else {
          setSelectedVersion("");
        }
      }
    } else {
      if (!storeVersionIsValidInProps) {
        if (versions && versions.length > 0) {
          setSelectedVersion(versions[0].id);
        } else {
          setSelectedVersion("");
        }
      }
    }
  }, [defaultVersion, versions, selectedVersion, setSelectedVersion]);

  const handleLaunch = async () => {
    if (!selectedVersion) return;
    await hookHandleLaunch();
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isButtonLaunching) return;
    // Navigate to profiles tab to switch version
    navigate("/profiles");
  };

  const renderLaunchButtonContent = () => {
    const actionText = isButtonLaunching ? (t('launch.cancel') || "Stop") : (t('launch.button') || "Launch");

    let statusSubText: string | null | undefined = null;
    let statusColorClass = "text-white/90";

    if (transientSuccessActive && buttonStatusMessage === t('launch.starting')) {
      statusSubText = buttonStatusMessage;
      statusColorClass = "text-green-300 font-bold";
    } else if (isButtonLaunching) {
      statusSubText = buttonStatusMessage || t('launch.launching', 'Launching...');
      statusColorClass = "text-white font-medium";
    } else if (buttonStatusMessage && launchState === LaunchState.ERROR) {
      statusSubText = buttonStatusMessage;
      statusColorClass = "text-red-300 font-bold";
    } else if (buttonStatusMessage) {
      statusSubText = buttonStatusMessage;
      statusColorClass = "text-white/90";
    }

    const displaySubText = statusSubText || selectedVersionLabel;

    return (
      <div className="w-full flex flex-col items-center justify-center leading-none -translate-y-[3px]">
        <span className="text-2xl font-black tracking-wider uppercase text-white drop-shadow">
          {actionText}
        </span>
        {displaySubText && (
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/35 border border-white/20 flex items-center max-w-[210px] shadow-sm">
            <span
              className={cn(
                "text-[11px] font-bold tracking-wide truncate normal-case leading-none",
                statusColorClass
              )}
              title={typeof displaySubText === "string" ? displaySubText : undefined}
            >
              {displaySubText}
            </span>
          </div>
        )}
      </div>
    );
  };

  const getButtonVariant = () => {
    if (isButtonLaunching) {
      return "destructive";
    }
    return "3d";
  };

  return (
    <div
      className={cn("relative flex flex-col justify-center select-none", className)}
      style={{ maxWidth }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center relative">
          <Button
            onClick={handleLaunch}
            disabled={
              !selectedVersion ||
              (versions && versions.length === 0 && !selectedVersion)
            }
            size="xl"
            icon={undefined}
            variant={getButtonVariant()}
            className={cn(
              "flex-1 !rounded-l-2xl !rounded-r-none !border !border-white/25 !border-r-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_20px_rgba(0,0,0,0.35)] hover:!border-white/40 transition-all",
              mainButtonWidth
            )}
            heightClassName={mainButtonHeight}
          >
            {renderLaunchButtonContent()}
          </Button>

          <IconButton
            onClick={handleOpenModal}
            disabled={isButtonLaunching || !versions || versions.length === 0}
            size="xl"
            className={cn(
              "!rounded-r-2xl !rounded-l-none !border !border-white/25 !border-l-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_20px_rgba(0,0,0,0.35)] hover:!border-white/40 !px-4 transition-all",
              mainButtonHeight
            )}
            icon={
              <Icon icon="solar:alt-arrow-down-bold" width="22" height="22" />
            }
            variant={
              getButtonVariant() === "destructive" ? "destructive" : "3d"
            }
            title={t('launcher.select_version', 'Version wechseln')}
            aria-label={t('launcher.select_version', 'Version wechseln')}
          />

          <div className="absolute -top-2 -left-2 w-7 h-7 z-10 pointer-events-auto">
            <RolloutIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}
