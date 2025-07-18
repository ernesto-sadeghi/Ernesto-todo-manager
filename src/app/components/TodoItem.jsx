function TodoItem() {
    return ( 
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center group opacity-70">
            <input type="checkbox" className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary mr-3" />
            <div className="flex-1">
              <h3 className="font-medium text-dark line-through">Buy groceries</h3>
              <p className="text-sm text-gray-500">Milk, eggs, bread</p>
            </div>
            <button className="text-gray-400 hover:text-accent opacity-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

       );
}

export default TodoItem;