import { DownloadIcon } from "lucide-react";

import ToolbarButton from "../Button";

interface ExportButtonProps {
  onDownload: () => void;
}

const ExportButton = ({ onDownload }: ExportButtonProps) => {
  return (
    <ToolbarButton onClick={onDownload} title="Export">
      <DownloadIcon />
    </ToolbarButton>
  );
};

export default ExportButton;
