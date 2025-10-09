import { LuUser } from "react-icons/lu";
import { Footer } from "../components/Footer";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import { data, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import Loader from "../components/Loader";
import { FiKey } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);
    const [error, setError] = useState("");
    const [token, setToken] = useState<string | null>("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const hasRun = useRef(false); // Ref to track if useEffect has run

    useEffect(() => {
        if (hasRun.current) return; // prevent double execution
        hasRun.current = true;
        
        const token = searchParams.get('token');
        setToken(token ? token : null);
        if (!token) {
            setStatus("");
            return;
        } else {
            setStatus("resetting");
        }
            
    }, [searchParams]);

    const checkPasswordMatch = () => {
        if (password !== confirmPassword && confirmPassword !== "") {
            setError("");
            setDoesPasswordMatch(false);
        } else {
            setDoesPasswordMatch(true);
        }
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setError(""); // Clear previous errors

        if (!email) {
            setError("Please enter your email address.");
            return;
        }
        setStatus("loading")
          const response = await api.post('/auth/forgot-password', { email })
            .then(res => {
                setStatus("success")
            })
            .catch(err => {
                setStatus("")
                setError(err.response.data.message);})
    }


    async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!password || !confirmPassword) {
            setError("Please fill in all password fields.");
            return;
        }
        if (!doesPasswordMatch) {
            setError("Passwords do not match.");
            return;
        }
        if (!token) {
            setError("Invalid or missing token.");
            return;
        }
        var data = {
            token: token,
            newPassword: password
        }
        try {
            setStatus('loading');
            await api.post('/auth/reset-password', data)
                .then(res => {
                    setStatus('successPasswordReset');
                })
                .catch(err => {
                    setStatus('resetting');
                    setError("Password reset failed. The link may be invalid or expired.");
                    throw err;
                })
            setStatus('success');
        } catch (error) {
            setError("Password reset failed. The link may be invalid or expired.");
            console.error("Password Reset failed:", error);
        }
    }

    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
                {status === "" && (
                    <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/2">
                        <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                                bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                                <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                                <span className="text-xl font-thin">Forgot Password</span>
                        </header>
        
                        <form id="emailFormForPasswordReset" onSubmit={handleSubmit} className="p-6 flex flex-col gap-y-8">
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
        
                            {/* Remember me button and forgot password link  goes here */}
                            <div>
                                <button type="submit" className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                                    Send Reset Link
                                </button> 
                            </div>
                            <div className="text-center text-sm text-gray-600">
                                <span className="pr-2"> Don't have an account?</span>
                                <button
                                    type="button" 
                                    className="text-blue-600 hover:underline cursor-pointer"
                                    onClick={() => navigate("/signup")}
                                > 
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {status === "success" && (
                    <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/2">
                        <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                                bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                                <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                                <span className="text-xl font-thin">Forgot Password</span>
                        </header>
        
                        <div className="p-6 flex flex-col items-center gap-y-8">
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
                            
                            <p className="text-center w-1/2">
                                An email has been sent to {email}. Please check your inbox and follow the instructions to reset your password.
                            </p>
                            
                        </div>
                    </div>
                )}
                {status === "successPasswordReset" && (
                    <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/2">
                        <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                                bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                                <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                                <span className="text-xl font-thin">Forgot Password</span>
                        </header>
        
                        <div className="p-6 flex flex-col items-center gap-y-8">
                            
                            <p className="text-center w-1/2">
                                Your password has been successfully reset. You can now <a href="/login" className="text-blue-600 hover:underline cursor-pointer">log in</a> with your new password.
                            </p>
                            
                        </div>
                    </div>
                )}

                {status === "loading" && 
                    <Loader />
                }

                {status === "resetting" && (
                    <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/2">
                        <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                                bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                                <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                                <span className="text-xl font-thin">Forgot Password</span>
                        </header>
        
                        <form id="confirmPasswordForm" onSubmit={handlePasswordSubmit} className="p-6 flex flex-col gap-y-8">
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
                            {/* PASSWORD */}
                            <div>
                                <label htmlFor="password">New Password</label>
                                <div  className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                                    <div className=" p-3 ">
                                        <FiKey   size={25} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter a new password..."
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
                            {/* Confirm PASSWORD */}
                            <div>
                                <label htmlFor="confirmpassword">Confirm Password</label>
                                <div  className={"flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all" 
                                    + (doesPasswordMatch ? "" : " border-red-500 ring-red-500 focus-within:ring-red-500 focus-within:border-red-500 transition-all")}>
                                    <div className=" p-3 ">
                                        <FiKey   size={25} />
                                    </div>
                                    <input
                                        id="confirmpassword"
                                        type={showRepeatPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => {setConfirmPassword(e.target.value);}}
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
                            <div>
                                <button type="submit" className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                                    Submit
                                </button> 
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                <a href="/forgot-password" type="button" className="text-blue-600 hover:underline cursor-pointer">
                                    Request another link
                                </a>
                            </div>  
                        </form>
                    </div>
                )}
    
                <Footer />
            </div>
        </>
    )
}