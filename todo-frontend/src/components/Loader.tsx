import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader() {
    return (
        <>
            <div className="bg-gray-400 text-blue-700 w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin">
                <AiOutlineLoading3Quarters size={100}/>
                </div>
            </div>
        </>
    )
}
