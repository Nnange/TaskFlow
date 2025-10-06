import { MdOutlineTaskAlt } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { Footer } from "../components/Footer";
import { MdOutlineMail } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { MdLogin } from "react-icons/md";





export default function EmailVerificationPage() {
  return (
    <>
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

                            <button type="button" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-x-2 cursor-pointer">
                                <MdLogin />
                                Proceed to Login
                            </button>        
                        </form>
                    </div>
        
                    <Footer />
        </div>
    </>
  )
}