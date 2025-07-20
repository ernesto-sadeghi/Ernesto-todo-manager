import { useSelector } from "react-redux";
import { selectTodos, selectTodoIds } from "../todoSlice";

function TodoFooter() {

  const remainingTodosCount = useSelector(state=>{
    const todos = selectTodos(state).filter(todo=> !todo.completed)
    return todos.length
  })
  const allTodosNumber = useSelector(selectTodoIds).length


  let suffix = remainingTodosCount>1? "s":""
    return (  <div className="mt-6 text-center text-sm text-dark/60">
          <p>{remainingTodosCount} item{suffix} left • {allTodosNumber-remainingTodosCount} completed</p>
        </div> );
}

export default TodoFooter;