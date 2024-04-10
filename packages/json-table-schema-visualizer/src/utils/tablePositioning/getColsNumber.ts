export const getColsNumber = (tableCount: number): number => {
  // display tables in 3 columns if the number of tables is less than 6
  // and 4 columns if the number of tables is greater than 6
  const MINIMAL_COLS_COUNT = 3;
  const MAXIMAL_COLS_COUNT = 4;

  return tableCount > 6 ? MAXIMAL_COLS_COUNT : MINIMAL_COLS_COUNT;
};
