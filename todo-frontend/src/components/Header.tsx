import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export function Header() {
    const dispatch = useDispatch();
  return (
    <header className="text-black p-3 bg-white w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">TaskFlow</span>
        </div>
        <button className="bg-green-500 p-3 rounded-lg cursor-pointer text-white"
            onClick={() => {
                dispatch(logout())
                // sessionStorage.removeItem("token")
                window.location.href = '/login';
            }}
        >
            Sign Out
        </button>
    </header>
  );
}