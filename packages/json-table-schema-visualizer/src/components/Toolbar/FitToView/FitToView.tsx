import { ExpandIcon } from "lucide-react";

import ToolbarButton from "../Button";

interface FitToViewButtonProps {
  onClick: () => void;
}

const FitToViewButton = ({ onClick } : FitToViewButtonProps) => {
  return (
    <ToolbarButton onClick={onClick} title="Fit-to-view">
      <ExpandIcon />
      <span className="ml-2">Fit To View</span>
    </ToolbarButton>
  );
};

export default FitToViewButton;
