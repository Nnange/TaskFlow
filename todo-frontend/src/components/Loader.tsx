import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader() {
    return (
        <>
            <div className="text-blue-700 w-full min-h-screen flex items-center justify-center absolute">
                <div className="animate-spin">
                <AiOutlineLoading3Quarters size={100}/>
                </div>
            </div>
        </>
    )
}
