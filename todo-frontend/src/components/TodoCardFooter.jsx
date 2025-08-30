function TodoCardFooter() {
  return (
    <div className="border-t grid grid-cols-6">
      <div  className="col-span-2 py-3 text-sm text-gray-500">
        Hello there!
      </div>
        <div className="col-span-4 py-3 text-sm text-gray-500 text-right">
            &copy; 2024 TaskFlow. All rights reserved.
        </div>
    </div>
  );
}

export default TodoCardFooter;