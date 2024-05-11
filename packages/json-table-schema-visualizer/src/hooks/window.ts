import { useLayoutEffect, useState } from "react";

import { type Dimension } from "@/types/dimension";

export function useWindowSize(): Dimension {
  const [size, setSize] = useState<Dimension>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    const handleResize = (): void => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}
