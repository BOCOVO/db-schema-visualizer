import { type Field } from "@mrleebo/prisma-ast";

import { isFunNodeType, isKeyValue } from "../isTypeOf";

import { type FieldConfig } from "@/types/intermediateFormattedNode";
import { PrismaFieldAttributeType } from "@/enums/prismaAstNodeType";

// Browse column attributes to identify its configurations
export const getFieldConfig = (
  fieldProps: Field["attributes"],
): FieldConfig => {
  if (fieldProps === undefined) return {};

  let defaultValue: string | number | boolean | null = null;
  let isPrimary = false;
  let incrementable = false;
  let isUniqueField = false;

  for (const prop of fieldProps) {
    switch (prop.name) {
      //
      case PrismaFieldAttributeType.default:
        if (prop.args === undefined) {
          break;
        }

        for (const defaultPropArg of prop.args) {
          // handle each case according to the value type

          // the arg is a scalar type
          if (typeof defaultPropArg.value !== "object") {
            defaultValue = defaultPropArg.value;
            break;
          }

          // the arg is KeyValue type
          if (isKeyValue(defaultPropArg.value)) {
            // only handle the case where the value is a primitive value
            if (typeof defaultPropArg.value.value !== "object") {
              defaultValue = defaultPropArg.value.value;
            }

            break;
          }

          // the arg is a function type
          if (isFunNodeType(defaultPropArg.value)) {
            defaultValue = defaultPropArg.value.name;
            // check if it is auto-incrementable
            if (defaultPropArg.value.name === "autoincrement") {
              incrementable = true;
            }
            break;
          }
        }
        break;

      case PrismaFieldAttributeType.id:
        isPrimary = true;
        break;

      case PrismaFieldAttributeType.unique:
        isUniqueField = true;
        break;
      default:
        break;
    }
  }

  return {
    dbdefault: defaultValue,
    increment: incrementable,
    pk: isPrimary,
    unique: isUniqueField,
  };
};
