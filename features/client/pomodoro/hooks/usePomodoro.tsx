import React, { DragEvent, TouchEvent, useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { usePomodoroStore } from "../stores/usePomodoroStore";

const usePomodoro = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const { loadPomodoroConfig, resetPomodoro } = usePomodoroStore(
    (s) => s,
    shallow
  );

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) =>
    setPosition({
      x: e.clientX - cursorPosition.x,
      y: e.clientY - cursorPosition.y,
    });

  const handleCursorDown = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) =>
    setCursorPosition({ x: e.clientX - position.x, y: e.clientY - position.y });

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    // setPosition({
    setPosition({
      x: e.touches[0].clientX - cursorPosition.x,
      y: e.touches[0].clientY - cursorPosition.y,
    });
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setCursorPosition({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  useEffect(() => {
    loadPomodoroConfig();

    return () => {
      resetPomodoro();
    };
  }, []);
  return {
    handleDragEnd,
    handleCursorDown,
    handleTouchMove,
    handleTouchStart,
    position,
    cursorPosition,
  };
};

export default usePomodoro;
