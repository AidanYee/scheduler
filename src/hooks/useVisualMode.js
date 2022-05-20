import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

    function transition(nextMode, replace = false) {
    
    if(replace) {
      history.pop();
    }
    setHistory((prev) => [...prev, nextMode]);
    setMode(nextMode);
  };

  function back() {

    if(history.length === 1) return undefined
    setMode(history[history.length-2])
    setHistory((prev) => [...prev].slice(0, history.length-1));

  };

  return { mode, transition, back};
}