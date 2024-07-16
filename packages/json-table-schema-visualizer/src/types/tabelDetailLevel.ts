export enum TableDetailLevel {
  FullDetails = "FullDetails",
  KeyOnly = "KeyOnly",
  HeaderOnly = "HeaderOnly",
}

export interface TableDetailLevelValue {
  detailLevel: TableDetailLevel;
  next: () => void;
}
