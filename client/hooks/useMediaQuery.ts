import { useState, useEffect } from "react";

// source: https://www.30secondsofcode.org/react/s/use-media-query
const useMediaQuery = (query: string): boolean => {
  if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return false;

  const mediaQuery = window.matchMedia(query);
  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return match;
};

export default useMediaQuery;
