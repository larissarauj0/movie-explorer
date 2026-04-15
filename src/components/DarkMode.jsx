import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function DarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="m-2 sm:m-4 p-2 sm:p-2.5 border rounded-xl text-base sm:text-lg
      bg-zinc-100 dark:bg-zinc-900 
      hover:bg-zinc-300 dark:hover:bg-zinc-800
      hover:scale-110 transition cursor-pointer"
    >
      {dark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </button>
  );
}