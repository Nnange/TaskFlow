import { useState } from "react"
import { MdOutlineTaskAlt } from "react-icons/md"
import { Footer } from "../components/Footer"
import { LuUser } from "react-icons/lu";
import { FiKey } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { SignUp } from "../services/login.service";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { IoMdClose } from "react-icons/io";
import { store } from "../redux/store";
import { useNavigate } from "react-router-dom";


export default function Register () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkPasswordMatch = () => {  
        if (password !== repeatPassword && repeatPassword !== "") {
            setDoesPasswordMatch(false);
        } else {
            setDoesPasswordMatch(true);
        }
    };
    
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await SignUp({ username, email, password});
            dispatch(signup({ token: response, email: email, user: username }));
            if (rememberMe) {
                localStorage.setItem("auth", JSON.stringify(store.getState().auth));
            } else {
                sessionStorage.setItem("auth", JSON.stringify(store.getState().auth));
            }
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid username or password. Please try again.");
        }
        
    };

  return (
   <>
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
            <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/2">
                <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                        bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                        <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                        <span className="text-xl font-thin">Sign in to access your tasks</span>
                </header>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-y-8">
                    {error && (
                        <div className="flex justify-between items-center p-3 bg-red-100 text-red-700 rounded-md">
                            <p>{error}</p>
                            <div className="cursor-pointer"
                                onClick={() => setError("")}
                            >
                                <IoMdClose />
                            </div> 
                        </div>
                    )}
                    {/* USERNAME */}
                    <div>
                        <label htmlFor="username">Username</label>
                        <div id="username" className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                            <div className=" p-3 ">
                                <LuUser  size={25} />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter a username of your choice..."
                                className="flex-1 pr- py-3 bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* EMAIL */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <div id="email" className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                            <div className=" p-3 ">
                                <LuUser  size={25} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email..."
                                className="flex-1 pr- py-3 bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <div id="password" className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                            <div className=" p-3 ">
                                <FiKey   size={25} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password..."
                                className="flex-1 pr- py-3 bg-transparent focus:outline-none"
                            />
                            {!showPassword && 
                                <button type="button" className="p-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FaRegEye size={25} />
                                </button>
                            }
                            {showPassword && 
                                <button type="button" className="p-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FaRegEyeSlash size={25} />
                                </button>
                            }

                        </div>
                    </div>
                    {/* repeat PASSWORD */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <div id="password" className={"flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all" 
                            + (doesPasswordMatch ? "" : " border-red-500 ring-red-500 focus-within:ring-red-500 focus-within:border-red-500 transition-all")}>
                            <div className=" p-3 ">
                                <FiKey   size={25} />
                            </div>
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                value={repeatPassword}
                                onChange={(e) => {setRepeatPassword(e.target.value);}}
                                onKeyUp={() => checkPasswordMatch()}
                                placeholder="Re-enter your password..."
                                className="flex-1 pr- py-3 bg-transparent focus:outline-none"
                            />
                            {!showRepeatPassword && 
                                <button type="button" className="p-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                >
                                    <FaRegEye size={25} />
                                </button>
                            }
                            {showRepeatPassword && 
                                <button type="button" className="p-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                >
                                    <FaRegEyeSlash size={25} />
                                </button>
                            }

                        </div>
                        {!doesPasswordMatch && 
                            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                        }
                    </div>

                    {/* Remember me button and forgot password link  goes here */}
                    <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-y-4">
                        <div className="flex items-center gap-x-2">
                            <input type="checkbox" id="remember"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                             />
                            <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                            Sign Up
                        </button> 
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        <span className="pr-2">Already have an account?</span>
                        <button type="button" className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            log In
                        </button>
                    </div>  
                </form>
            </div>

            <Footer />
        </div>
    </>
  )
}