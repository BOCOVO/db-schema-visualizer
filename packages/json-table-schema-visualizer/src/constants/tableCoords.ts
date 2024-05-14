// For some reason, if the position of a table could not be restored or not computed,
// this const is used to keep the same reference during rendering to avoid
// unnecessary rendering created by the useTableDefaultPosition hook
export const defaultTableCoord = { x: 0, y: 0 };
