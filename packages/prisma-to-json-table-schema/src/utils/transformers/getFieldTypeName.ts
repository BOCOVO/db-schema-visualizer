import type { Field } from "@mrleebo/prisma-ast";

export const getFieldTypeName = (fieldType: Field["fieldType"]): string => {
  return typeof fieldType === "string" ? fieldType : fieldType.name;
};
