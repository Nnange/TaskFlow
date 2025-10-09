import { MdLogin, MdOutlineTaskAlt } from "react-icons/md";
import { Footer } from "../components/Footer";
import { MdOutlineMail } from "react-icons/md";
import { FiCheckCircle, FiRefreshCcw } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {api} from "../services/api";
import Loader from "../components/Loader";


export default function EmailVerificationPage() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'check', 'error'
    const hasRun = useRef(false); // Ref to track if useEffect has run

    
    useEffect(() => {
        if (hasRun.current) return; // prevent double execution
        hasRun.current = true;

        const token = searchParams.get('token');
        if (!token) {
            setStatus('check');
            return;
        } else {
            verifyEmail();
        }

        async function verifyEmail(){
            try {
                setStatus('loading');
                const response = await api.get(`/auth/verify?token=${token}`);
                setStatus('success');
            } catch (error) {
                console.error("Email verification failed:", error);
                setStatus('error');
            }
        };

        
    }, [searchParams]);


  return (
    <>
    {status === 'loading' &&
        <Loader />
    }

    {status === 'check' && 
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
            <div className="border rounded-lg mx-4 bg-white sm:mx-4 mt-3 mb-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/3">
                <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                        bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                        <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                        <span className="text-xl font-thin">Verify your email address</span>
                </header>

                <form className="p-6 flex flex-col gap-y-8">
                    <div className="border rounded-[5rem] bg-blue-50 flex flex-col items-center w-1/5 p-4 mx-auto ">
                        <MdOutlineMail size={50}/>
                    </div>

                    <div className="text-center flex flex-col gap-y-4">
                        <h2 className="text-2xl font-semibold">Check your email</h2>
                        <p className="text-gray-600">We have sent a verification link to your email address. Please check your inbox and click on the link to verify your account.</p>
                    </div>

                    <div className="flex flex-col items-start gap-y-4 border p-4 rounded-md bg-gray-100">
                        <h2 className="text-lg font-semibold">Didn't receive the email?</h2>
                        <ul className="list-disc list-inside ml-2">
                            <li className="">Check your spam  or junk folder</li>
                            <li className="">Verify you entered the correct email address</li>
                            <li className="">Allow a few minutes for the email to arrive</li>
                        </ul>       
                    </div>

                    <button type="button" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-x-2 cursor-pointer">
                        <FiRefreshCcw />
                        Resend Verification Email
                    </button>

                    <a href="/login" className="text-center text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer">Return to login</a>

                        
                </form>
            </div>

            <Footer />
        </div>
    }

    {status === 'success' && 
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
            <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/3">
                <header className="text-white rounded-t-lg p-3 flex flex-col items-center justify-center gap-2
                        bg-linear-to-r/hsl from-indigo-500 to-teal-400">
                        <span className="text-3xl font-bold flex items-center gap-x-1"> <MdOutlineTaskAlt size={25} />TaskFlow</span>
                        <span className="text-xl font-thin">Verify your email address</span>
                </header>

                <form className="p-6 flex flex-col gap-y-8">
                    <div className="rounded-[5rem] bg-green-200 flex flex-col items-center w-1/5 p-4 mx-auto ">
                        <FiCheckCircle size={50} stroke="green" />
                    </div>

                    <div className="text-center flex flex-col gap-y-4">
                        <h2 className="text-2xl font-semibold">Verification Complete!</h2>
                        <p className="text-gray-600">Your email has been successfully verified. You can now lon in to your account and start using TaskFlow.</p>
                    </div>

                    <div className="flex flex-col items-start gap-y-4 border p-4 rounded-md bg-blue-100">
                        <p className="text-blue-900">Thany you for verifying your email address. Your account is now fully activated.</p>
                    </div>

                    <Link to={"/login"}>
                        <button type="button" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-x-2 cursor-pointer">
                            Proceed to Login
                            <MdLogin />
                        </button>        
                    </Link>
                </form>
            </div>

            <Footer />
        </div>
    }
    {status === 'error' &&
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
            <div className="border rounded-lg mx-4 bg-white sm:mx-4 my-12  shadow-md text-black max-w-full md:w-3/4 lg:w-1/3">
                <header className="text-white rounded-lg p-3 flex flex-col items-center justify-center gap-2
                        bg-white">
                        <span className="text-xl text-red-500 font-thin">Error in the verificaion of you email</span>
                </header>
            </div>
            <Footer />
        </div>
    }    
    </>
  )
}