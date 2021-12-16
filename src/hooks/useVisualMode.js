import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length === 1) {
      setMode(initialMode);
    } else {
      setHistory(history.slice(0, -1));
      setMode(history[history.length - 2]);
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
