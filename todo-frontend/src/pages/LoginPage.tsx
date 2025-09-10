import { useState } from "react"
import { MdOutlineTaskAlt } from "react-icons/md"
import { Footer } from "../components/Footer"
import { LuUser } from "react-icons/lu";
import { FiKey } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";



export function LoginPage () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  return (
   <>
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
            <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/2">
                <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                        bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                        <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                        <span className="text-xl font-thin">Sign in to access your tasks</span>
                </header>

                <form className="p-6 flex flex-col gap-y-8">
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
                                placeholder="Enter your username..."
                                className="flex-1 pr- py-3 bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label htmlFor="username">Password</label>
                        <div id="username" className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
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
                                <button className="p-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FaRegEye size={25} />
                                </button>
                            }
                            {showPassword && 
                                <button className="p-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FaRegEyeSlash size={25} />
                                </button>
                            }

                        </div>
                    </div>

                    {/* Remember me button and forgot password link  goes here */}
                    <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-y-4">
                        <div className="flex items-center gap-x-2">
                            <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                            <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                            Sign In
                        </button> 
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account? 
                        <a href="/" className="text-blue-600 hover:underline"> Sign Up</a>
                    </div>  
                </form>
            </div>

            <Footer />
        </div>
    </>
  )
}
