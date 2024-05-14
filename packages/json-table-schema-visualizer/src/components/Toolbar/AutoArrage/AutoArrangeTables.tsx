import { LayoutPanelLeftIcon } from "lucide-react";

import ToolbarButton from "../Button";

import { useTablePositionContext } from "@/hooks/table";

const AutoArrangeTableButton = () => {
  const { resetPositions } = useTablePositionContext();

  return (
    <ToolbarButton onClick={resetPositions} title="Auto-arrange">
      <LayoutPanelLeftIcon />

      <span className="ml-2">Auto-arrange</span>
    </ToolbarButton>
  );
};

export default AutoArrangeTableButton;
