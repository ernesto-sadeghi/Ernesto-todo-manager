import { useDispatch, useSelector } from "react-redux";
import { changeFilter, StatusFilters } from "../filterSlice";

function StatusFilter() {
const dispatch = useDispatch()
const filterStatus = useSelector(state=>state.filter.filterStatus)

const statusHandler = (filter)=>{
  
  dispatch(changeFilter(filter))

}

const renderedFilters = Object.entries(StatusFilters).map(([key, value]) => (
  <button
    key={key}
    onClick={() => statusHandler(value)}
    className={
      value === filterStatus
        ? "flex-1 py-2 px-4 rounded-lg text-primary font-medium bg-primary/10"
        : "flex-1 py-2 px-4 rounded-lg text-dark hover:bg-gray-100"
    }
  >
    {value}
  </button>
));



    return ( <div className="flex justify-between mb-6 bg-white rounded-xl shadow-lg p-2">
          {/* <button onClick={()=>statusHandler("All")} className="flex-1 py-2 px-4 rounded-lg  bg-primary/10">All</button>
          <button onClick={()=>statusHandler("Active")} className="flex-1 py-2 px-4 rounded-lg text-dark hover:bg-gray-100">Active</button>
          <button onClick={()=>statusHandler("Completed")} className="flex-1 py-2 px-4 rounded-lg text-dark hover:bg-gray-100">Completed</button> */}
      {renderedFilters}
        </div> );
}

export default StatusFilter;