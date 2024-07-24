import { PanelsTopLeftIcon, PanelTopIcon, KeyRoundIcon } from "lucide-react";
import { useMemo } from "react";

import ToolbarButton from "../Button";

import { useTableDetailLevel } from "@/hooks/tableDetailLevel";
import { TableDetailLevel } from "@/types/tableDetailLevel";

interface DetailLevelToggleProps {
  onClick: () => void;
}

const FullDetailLevel = ({ onClick }: DetailLevelToggleProps) => {
  return (
    <ToolbarButton title="Full Details" onClick={onClick}>
      <PanelsTopLeftIcon />

      <span className="ml-2">Full Details</span>
    </ToolbarButton>
  );
};
const HeaderOnlyLevel = ({ onClick }: DetailLevelToggleProps) => {
  return (
    <ToolbarButton title="Header Only" onClick={onClick}>
      <PanelTopIcon />

      <span className="ml-2">Header Only</span>
    </ToolbarButton>
  );
};
const KeyOnlyLevel = ({ onClick }: DetailLevelToggleProps) => {
  return (
    <ToolbarButton title="Key Only" onClick={onClick}>
      <KeyRoundIcon />

      <span className="ml-2">Key Only</span>
    </ToolbarButton>
  );
};

const COMPONENT_MAP = {
  [TableDetailLevel.FullDetails]: FullDetailLevel,
  [TableDetailLevel.HeaderOnly]: HeaderOnlyLevel,
  [TableDetailLevel.KeyOnly]: KeyOnlyLevel,
};

const DetailLevelToggle = () => {
  const { detailLevel, next } = useTableDetailLevel();
  const Component = useMemo(() => COMPONENT_MAP[detailLevel], [detailLevel]);

  return <Component onClick={next} />;
};

export default DetailLevelToggle;
