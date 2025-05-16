import { useContext } from "react";

import {
  type ScrollDirection,
  type ScrollDirectionProviderValue,
} from "@/types/scrollDirection";
import { ScrollDirectionContext } from "@/providers/ScrollDirectionProvider";

export const useScrollDirectionContext = (): ScrollDirectionProviderValue => {
  const contextValue = useContext(ScrollDirectionContext);
  if (contextValue === undefined) {
    throw new Error(
      "it seem you forgot to wrap your app with ScrollDirectionProvider",
    );
  }

  return contextValue;
};

export const useScrollDirection = (): ScrollDirection => {
  const contextValue = useScrollDirectionContext();

  return contextValue.scrollDirection;
};
