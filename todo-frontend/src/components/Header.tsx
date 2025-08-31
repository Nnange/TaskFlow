import { MdOutlineTaskAlt } from "react-icons/md";



function Header() {
  return (
    <header className="text-white rounded-t-lg p-3 flex items-center justify-center gap-2
        bg-linear-to-r/hsl from-indigo-500 to-teal-400">
        <MdOutlineTaskAlt size={25} />
        <span className="text-3xl font-bold">TaskFlow</span>
    </header>
  );
}

export default Header;