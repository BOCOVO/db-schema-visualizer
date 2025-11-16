import PropTypes from "prop-types";

import AutoArrangeTableButton from "./AutoArrage/AutoArrangeTables";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import DetailLevelToggle from "./DetailLevelToggle/DetailLevelToggle";
import FitToViewButton from "./FitToView/FitToView";
import ExportButton from "./Export/Export";

const Toolbar = ({
  onFitToView,
  onDownload,
}: {
  onFitToView: () => void;
  onDownload: () => void;
}) => {
  return (
    <div className="flex absolute [&_svg]:w-5 [&_svg]:h-5 px-6 py-1 bottom-14 text-sm bg-gray-100 dark:bg-gray-700 shadow-lg rounded-2xl">
      <AutoArrangeTableButton />
      <DetailLevelToggle />
      <FitToViewButton onClick={onFitToView} />
      <hr className="mx-4 my-1 w-px h-6 bg-gray-300" />
      <ExportButton onDownload={onDownload} />
      <hr className="mx-4 my-1 w-px h-6 bg-gray-300" />
      <ThemeToggler />
    </div>
  );
};

Toolbar.propTypes = {
  onFitToView: PropTypes.func.isRequired,
};

export default Toolbar;
