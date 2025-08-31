import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

interface TodoInputProps {
  onAdd: (text: string) => void
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(text)
    setText('')
  }
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white p-3 transition-colors cursor-pointer"
        >
            <IoAddCircleOutline size={25} />
        </button>
      </div>
    </form>
  );
}

export default TodoInput;