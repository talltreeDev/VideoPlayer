import React, { useCallback, useState } from "react";

import { Icon, Icons } from "@/components/Icon";
import { AutoSkipButton } from "@/components/player/internals/AutoSkipButton";
import { VideoPlayerButton } from "@/components/player/internals/Button";
// import { useOverlayRouter } from "@/hooks/useOverlayRouter";
import { usePlayerStore } from "@/stores/player/store";

export function SkipForward(props: { iconSizeClass?: string }) {
  const display = usePlayerStore((s) => s.display);
  const time = usePlayerStore((s) => s.progress.time);

  const commit = useCallback(() => {
    display?.setTime(time + 10);
  }, [display, time]);

  return (
    <VideoPlayerButton
      iconSizeClass={props.iconSizeClass}
      onClick={commit}
      icon={Icons.SKIP_FORWARD}
    />
  );
}

export function SkipBackward(props: { iconSizeClass?: string }) {
  const display = usePlayerStore((s) => s.display);
  const time = usePlayerStore((s) => s.progress.time);

  const commit = useCallback(() => {
    display?.setTime(time - 10);
  }, [display, time]);

  return (
    <VideoPlayerButton
      iconSizeClass={props.iconSizeClass}
      onClick={commit}
      icon={Icons.SKIP_BACKWARD}
    />
  );
}

export function AutoSkip() {
  // const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [autoSkip, setAutoSkip] = useState(false);
  const showSkipTime = usePlayerStore((s) => s.setAutoSkipShow);
  const showSkipSetting = usePlayerStore((s) => s.setAutoSkipValue);
  const autoSkipList = usePlayerStore((s) => s.interface.skipTimeList);
  const skipSettingShow = usePlayerStore((s) => s.interface.skipSettingShow);

  return (
    <AutoSkipButton
      onClick={() => {
        if (autoSkipList.length > 0) {
          showSkipTime(!autoSkip);
          setAutoSkip((s) => !s);
        } else {
          showSkipSetting(!skipSettingShow);
        }
      }}
    >
      {autoSkipList.length > 0 ? (
        autoSkip ? (
          <h3>
            Auto Skip Intro <span>Off</span>
          </h3>
        ) : (
          <h3>
            Auto Skip Intro <span>On</span>
          </h3>
        )
      ) : (
        <h3 className="flex items-center">
          <span className="mr-2">
            <Icon icon={Icons.TOUR} />
          </span>
          Submit Auto Skip
        </h3>
      )}
    </AutoSkipButton>
  );
}
