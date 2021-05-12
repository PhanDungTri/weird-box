import { RefObject, useEffect, useRef } from "react";

export const useOnClickOutside = <T extends HTMLElement>(onClickOutside: () => void): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClickOutside();
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);

  return ref;
};
