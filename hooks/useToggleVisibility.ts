import { RefObject, useCallback, useEffect, useState } from "react";

interface Options {
  initialVisibility?: boolean;
  handlingClickOutside?: boolean;
  targetElement?: RefObject<any | null>;
}

type Hook = (options?: Options) => [boolean, () => void];

export const useToggleVisibility: Hook = (options) => {
  const {
    initialVisibility = false,
    handlingClickOutside = false,
    targetElement,
  } = options || {};

  const [isVisible, setIsVisible] = useState(initialVisibility);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const shouldToggle =
        !isVisible ||
        (targetElement?.current &&
          targetElement.current.contains(event.target));

      if (shouldToggle) {
        return;
      }

      setIsVisible(false);
    };

    if (handlingClickOutside) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [isVisible, handlingClickOutside, targetElement]);

  return [isVisible, toggleVisibility];
};
