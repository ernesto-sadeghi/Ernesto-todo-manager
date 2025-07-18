function TodoInput() {
    return ( 
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition hover:scale-[1.01]">
          <h2 className="text-xl font-semibold text-dark mb-4 flex items-center">
          
            Add New Task
          </h2>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="title"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <input
              type="text"
              placeholder="sub-content"
              className="flex-1 my-4 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <button className="bg-secondary text-white px-4 py-2 rounded-r-lg hover:bg-secondary/90 transition">
              Add
            </button>
          </div>
        </div> );
}

export default TodoInput;