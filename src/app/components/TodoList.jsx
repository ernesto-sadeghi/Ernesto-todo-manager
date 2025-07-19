import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, selectTodotIds } from "../todoSlice";
import TodoItem from "./TodoItem";
import { useEffect } from "react";

function TodoList() {
    const todoIds = useSelector(selectTodotIds)
    const dispatch = useDispatch()
    const status = useSelector(state => state.todos.status)
    const error = useSelector(state => state.todos.error)
    
    useEffect(() => {
        if (status === 'idle') {
            
            dispatch(fetchTodo())
        }
    }, [dispatch,status])
    
    let content
    if ('loading' === status) {
        content = <div className="loader">loading ...</div>
    } else if ('success' === status) {
        content = todoIds.map(id => <TodoItem todoId={id} key={id} />)
    } else if ('error' === status) {
        content = <div className="error">{error}</div>
    }



    return (<div className="space-y-3">
        {content}
    </div>);
}

export default TodoList;