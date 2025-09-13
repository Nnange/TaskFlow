import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { RootState, store } from "../redux/store";
import { useNavigate } from "react-router-dom";


export function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const savedAuth = JSON.parse(
      localStorage.getItem("auth") || 
      sessionStorage.getItem("auth") ||
      "null"
    );

    const username = useSelector((state: RootState) => state.auth.user) || savedAuth?.user || "Guest";

  return (
    <header className="text-black p-3 bg-white w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">TaskFlow</span>
        </div>
        <div className="flex items-center gap-6">
            <span className="text-black underline">Welcome {username}!</span>
            <button className="bg-green-500 p-3 rounded-lg cursor-pointer text-white"
                onClick={() => {
                    dispatch(logout())
                    navigate("/login");
                }}
            >
                Sign Out
            </button>
        </div>
    </header>
  );
}