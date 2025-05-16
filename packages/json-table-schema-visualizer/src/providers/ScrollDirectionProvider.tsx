import { createContext, type PropsWithChildren } from "react";

import {
  ScrollDirection,
  type ScrollDirectionProviderValue,
} from "@/types/scrollDirection";

export const ScrollDirectionContext =
  createContext<ScrollDirectionProviderValue>({
    scrollDirection: ScrollDirection.UpOut,
  });

interface ScrollDirectionProviderProps extends PropsWithChildren {
  scrollDirection: ScrollDirection;
}

const ScrollDirectionProvider = ({
  scrollDirection,
  children,
}: ScrollDirectionProviderProps) => {
  return (
    <ScrollDirectionContext.Provider value={{ scrollDirection }}>
      {children}
    </ScrollDirectionContext.Provider>
  );
};

export default ScrollDirectionProvider;
