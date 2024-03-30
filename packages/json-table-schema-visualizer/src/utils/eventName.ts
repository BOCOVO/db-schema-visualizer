export const computeTableDragEventName = (tableName: string): string => {
  return `on:table:drag:${tableName}`;
};
