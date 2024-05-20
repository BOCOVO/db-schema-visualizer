import type { PrismaAstNodeType } from "../enums/prismaAstNodeType";

export interface AstNode {
  type: PrismaAstNodeType | string;
}
