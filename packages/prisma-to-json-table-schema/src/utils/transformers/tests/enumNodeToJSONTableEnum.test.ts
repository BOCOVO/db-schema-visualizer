import { enumNodeToJSONTableEnum } from "../enumNodeToJSONTableEnum";

import { colorEnum } from "@/tests/data";

describe("transform dbml enum to json table enum", () => {
  test("transform enum", () => {
    expect(enumNodeToJSONTableEnum(colorEnum)).toMatchObject({
      name: colorEnum.name,
      values: [
        {
          name: "Red",
        },
      ],
    });
  });
});
