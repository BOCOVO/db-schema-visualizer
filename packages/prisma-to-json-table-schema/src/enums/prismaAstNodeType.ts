export enum PrismaAstNodeType {
  schema = "schema",
  model = "model",
  type = "type",
  view = "view",
  datasource = "datasource",
  generator = "generator",
  enum = "enum",
  comment = "comment",
  break = "break",
  assignment = "assignment",
  enumerator = "enumerator",
  attribute = "attribute",
  field = "field",
  attributeArgument = "attributeArgument",
  keyValue = "keyValue",
  array = "array",
  function = "function",
}

export enum PrismaFieldAttributeType {
  default = "default",
  id = "id",
  unique = "unique",
  relation = "relation",
}
