export interface TableColors {
  regular: string;
  lighter: string;
}

export interface TableColorContextValue {
  tableColors: Map<string, TableColors>;
}
