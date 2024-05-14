import AutoArrangeTableButton from "./AutoArrage/AutoArrangeTables";
import ThemeToggler from "./ThemeToggler/ThemeToggler";

const Toolbar = () => {
  return (
    <div className="flex absolute [&_svg]:w-5 [&_svg]:h-5 px-6 py-1 bottom-14 text-sm bg-gray-100 dark:bg-gray-700 shadow-lg rounded-2xl">
      <AutoArrangeTableButton />

      <hr className="w-px h-6 mx-4 my-1 bg-gray-300" />

      <ThemeToggler />
    </div>
  );
};

export default Toolbar;
