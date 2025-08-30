

function TodoCard() {
  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center">
        <div className="border rounded p-4 bg-white shadow-mdt text-black w-1/2">
        <h2 className="todo-title">Todo Title</h2>
        <p className="todo-description">This is a description of the todo item.</p>
        <button className="">Mark as Complete</button>
        </div>
    </div>
  );
}

export default TodoCard;