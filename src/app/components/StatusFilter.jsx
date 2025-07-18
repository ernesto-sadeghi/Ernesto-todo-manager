function StatusFilter() {
    return ( <div className="flex justify-between mb-6 bg-white rounded-xl shadow-lg p-2">
          <button className="flex-1 py-2 px-4 rounded-lg text-primary font-medium bg-primary/10">All</button>
          <button className="flex-1 py-2 px-4 rounded-lg text-dark hover:bg-gray-100">Active</button>
          <button className="flex-1 py-2 px-4 rounded-lg text-dark hover:bg-gray-100">Completed</button>
        </div> );
}

export default StatusFilter;