import {
  CogIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
  XIcon,
} from "@heroicons/react/outline";
import React from "react";
import shallow from "zustand/shallow";
import usePomodoro from "../hooks/usePomodoro";
import { usePomodoroStore } from "../stores/usePomodoroStore";

const PomodoroFloatBox = () => {
  const {
    pausePomodoro,
    startPomodoro,
    stopPomodoro,
    formattedTimer,
    setShowPomodoro,
    isRunning,
    remainingTime,
  } = usePomodoroStore((s) => s, shallow);

  const {
    handleDragEnd,
    handleCursorDown,
    handleTouchMove,
    handleTouchStart,
    position,
  } = usePomodoro();

  const actionButtons: Record<
    string,
    { Icon: <T>(props: T) => JSX.Element; onClick: () => void }
  > = {
    play: { Icon: PlayIcon, onClick: startPomodoro },
    pause: { Icon: PauseIcon, onClick: pausePomodoro },
    stop: { Icon: StopIcon, onClick: stopPomodoro },
    cog: { Icon: CogIcon, onClick: () => {} },
    x: { Icon: XIcon, onClick: () => setShowPomodoro(false) },
  };

  return (
    <div
      className='fixed z-40 top-1/2 left-1/2 flex items-center flex-col p-8 bg-brand rounded hover:cursor-move'
      onDragEnd={handleDragEnd}
      onMouseDown={handleCursorDown}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      draggable
      style={{
        left: position.x + "px" || "50%",
        top: position.y + "px" || "50%",
      }}
    >
      <h1 className='text-5xl mb-4'>{formattedTimer(remainingTime)}</h1>
      <span className='flex items-center space-x-8'>
        {Object.entries(actionButtons).map(([key, { Icon, onClick }]) => (
          <button
            title={key}
            key={key}
            onClick={onClick}
            className={`duration-200 hover:bg-brand-gray-2/50 p-2 rounded-full ${
              isRunning && key === "play"
                ? "hidden"
                : !isRunning && key === "pause"
                ? "hidden"
                : isRunning && key === "pause"
                ? "!ml-0"
                : ""
            }`}
          >
            <Icon className='h-8 w-8 cursor-pointer hover:text-brand-gray-3' />
          </button>
        ))}
      </span>
    </div>
  );
};

export default PomodoroFloatBox;
