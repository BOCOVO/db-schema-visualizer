import { useContext } from "react";
import { type JSONTableEnum } from "shared/types/tableSchema";

import { EnumsContext } from "@/providers/EnumsProvider";
import { type EnumsContextValue } from "@/types/enums";

export const useEnums = (): EnumsContextValue => {
  const value = useContext(EnumsContext);

  if (value == null) {
    throw new Error("useEnums must be used within an EnumsProvider");
  }

  return value;
};

export const useGetEnum = (enumName: string): JSONTableEnum | undefined => {
  const value = useEnums();

  return value.enums.find((en) => en.name === enumName);
};
