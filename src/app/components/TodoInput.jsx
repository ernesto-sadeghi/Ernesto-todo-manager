
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../todoSlice";

function TodoInput() {
const [title,setTitle] = useState("")
const [content,setContent] = useState("")
const dispatch = useDispatch()
const handleSubmit = ()=>{

  dispatch(addTodo({title,subContent:content}))
}

    return ( 
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition hover:scale-[1.01]">
          <h2 className="text-xl font-semibold text-dark mb-4 flex items-center">
          
            Add New Task
          </h2>
          <div className="flex flex-col">
            <input 
            onChange={(e)=>{setTitle(e.target.value)}}
            value={title}
              type="text"
              placeholder="title"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <input 
            onChange={(e)=>{setContent(e.target.value)}} 
            value={content}
              type="text"
              placeholder="sub-content"
              className="flex-1 my-4 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <button onClick={handleSubmit} className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition">
              Add
            </button>
          </div>
        </div> );
}

export default TodoInput;