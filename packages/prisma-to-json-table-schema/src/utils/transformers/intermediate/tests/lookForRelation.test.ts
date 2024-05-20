import { type Field } from "@mrleebo/prisma-ast";

import { lookForRelation } from "../lookForRelation";

import { type RawRelationInfo } from "@/types/intermediateFormattedNode";
import {
  namedRelationTable1,
  namedRelationTable2,
  productRelation,
  productTable,
} from "@/tests/data";

describe("look for relations", () => {
  test("identifier relations", () => {
    const registerRelation = jest.fn();
    const registerInverseRelation = jest.fn();
    const testTableName = "TestTable";

    lookForRelation(
      productRelation,
      testTableName,
      registerRelation,
      registerInverseRelation,
    );

    expect(registerRelation).toHaveBeenCalledWith({
      table: testTableName,
      field: "productId",
      referenceTable: "Product",
      referenceField: "id",
    } satisfies RawRelationInfo);
    expect(registerInverseRelation).not.toHaveBeenCalled();
  });

  test("will register named relation defined with keyvalue: @relation(name: 'name-here' )", () => {
    const registerRelation = jest.fn();
    const registerInverseRelation = jest.fn();

    const testTableName = "TestTable";

    lookForRelation(
      namedRelationTable1.properties[3] as Field,
      testTableName,
      registerRelation,
      registerInverseRelation,
    );

    expect(registerRelation).toHaveBeenCalledWith({
      table: testTableName,
      field: "player1Id",
      name: '"player1"',
      referenceField: "id",
      referenceTable: "User",
    } satisfies RawRelationInfo);
  });

  test("will register named relation defined without keyvalue @relation('name-here')", () => {
    const registerRelation = jest.fn();
    const registerInverseRelation = jest.fn();

    const testTableName = "TestTable";

    lookForRelation(
      namedRelationTable1.properties[5] as Field,
      testTableName,
      registerRelation,
      registerInverseRelation,
    );

    expect(registerRelation).toHaveBeenCalledWith({
      table: testTableName,
      field: "player2Id",
      name: '"player2"',
      referenceField: "id",
      referenceTable: "User",
    } satisfies RawRelationInfo);
  });

  test("will register inverse relation", () => {
    const registerRelation = jest.fn();
    const registerInverseRelation = jest.fn();

    const testTableName = "TestTable";

    lookForRelation(
      productTable.properties[6] as Field,
      testTableName,
      registerRelation,
      registerInverseRelation,
    );
    expect(registerInverseRelation).toHaveBeenCalledWith(
      "TestTable.Order",
      "many",
    );
    expect(registerRelation).not.toHaveBeenCalled();
  });

  test("will register inverse relation with name", () => {
    const registerRelation = jest.fn();
    const registerInverseRelation = jest.fn();

    const testTableName = "TestTable";

    lookForRelation(
      namedRelationTable2.properties[5] as Field,
      testTableName,
      registerRelation,
      registerInverseRelation,
    );
    expect(registerInverseRelation).toHaveBeenCalledWith(
      'TestTable.Match."player1"',
      "many",
    );
    expect(registerRelation).not.toHaveBeenCalled();
  });
});
