interface UseCursorChangerReturnValue {
  onChange: () => void;
  onRestore: () => void;
}

export const useCursorChanger = (
  cursor: string,
): UseCursorChangerReturnValue => {
  return {
    onChange: () => {
      document.body.style.cursor = cursor;
    },
    onRestore: () => {
      document.body.style.cursor = "default";
    },
  };
};
