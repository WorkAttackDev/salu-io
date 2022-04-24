import create from "zustand";
import { MyPomodoro } from "../models/MyPomodoro";

type PomodoroStoreType = {
  showPomodoro: boolean;
  remainingTime: number;
  type: "pomodoro" | "shortBreak";
  pomodoro: MyPomodoro;
  isRunning: boolean;
  setShowPomodoro: (state: boolean) => void;
  startPomodoro: () => void;
  stopPomodoro: () => void;
  resetPomodoro: () => void;
  pausePomodoro: () => void;
  loadPomodoroConfig: () => void;
  savePomodoroConfig: (pomodoro: MyPomodoro) => void;
  formattedTimer: (minutes: number) => string;
};

let timer: NodeJS.Timeout;

const POMODORO_LOCAL_STORAGE_KEY = "pomodorosaluiochave";
// const BASE_POMODORO_DURATION = 25 * 60; // 25 minutes in seconds
const BASE_POMODORO_DURATION = 5; // 25 minutes in seconds

const notificationSound = () => {
  const audio = new Audio("/audio/1.wav");
  audio.play();
};

const loadPomodoroConfig = (): MyPomodoro | null => {
  const pomodoro = localStorage.getItem(POMODORO_LOCAL_STORAGE_KEY);
  return pomodoro ? JSON.parse(pomodoro) : null;
};

const savePomodoroConfig = (pomodoro: MyPomodoro) => {
  localStorage.setItem(POMODORO_LOCAL_STORAGE_KEY, JSON.stringify(pomodoro));
};

const formattedTimer = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${hours > 0 ? `${hours}:` : ""}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
};

export const usePomodoroStore = create<PomodoroStoreType>((set, get) => ({
  showPomodoro: true,
  remainingTime: BASE_POMODORO_DURATION,
  isRunning: false,
  type: "pomodoro",
  pomodoro: {
    breakTime: 10,
    duration: BASE_POMODORO_DURATION,
  },
  startPomodoro: () => {
    if (timer) {
      clearInterval(timer);
    }

    timer = setInterval(() => {
      if (get().remainingTime === 0) {
        clearTimeout(timer);
        notificationSound();
        set((s) => ({
          type: s.type === "pomodoro" ? "shortBreak" : "pomodoro",
          isRunning: false,
          remainingTime:
            s.type === "pomodoro" ? s.pomodoro.breakTime : s.pomodoro.duration,
        }));
        return;
      }

      set((state) => ({
        remainingTime: state.remainingTime - 1,
        isRunning: true,
      }));
    }, 1000);
  },
  stopPomodoro: () => {
    clearInterval(timer);
    set((s) => ({
      remainingTime: s.pomodoro.duration,
      type: "pomodoro",
      isRunning: false,
    }));
  },
  resetPomodoro: () => {
    clearInterval(timer);
    get().loadPomodoroConfig();
  },
  pausePomodoro: () => {
    clearInterval(timer);
    set({ isRunning: false });
  },
  loadPomodoroConfig: () => {
    const pomodoro = loadPomodoroConfig();
    pomodoro &&
      set({
        pomodoro: pomodoro,
        remainingTime: pomodoro.duration,
        type: "pomodoro",
        isRunning: false,
      });
  },
  savePomodoroConfig: (pomodoro: MyPomodoro) => {
    savePomodoroConfig(pomodoro);
  },
  formattedTimer,
  setShowPomodoro: (state: boolean) => set({ showPomodoro: state }),
}));
