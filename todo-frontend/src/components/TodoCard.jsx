import TodoCardFooter from "./TodoCardFooter";
import Header from "./Header";
import TodoInput from "./TodoInput";

function TodoCard() {
  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center">
        <div className="border rounded-lg  bg-white shadow-mdt text-black w-1/3">
        <Header />

        <div className="p-4">
            <TodoInput />
            
            {/* Todo List would go here */}
        
           <TodoCardFooter />
        </div>
        </div>
    </div>
  );
}

export default TodoCard;