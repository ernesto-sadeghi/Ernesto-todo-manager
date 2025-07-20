import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, filteredTodoIds, } from "../todoSlice";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { selectLogin } from "../userSlice";

function TodoList() {

    const todoIds = useSelector(filteredTodoIds)


    const dispatch = useDispatch()
    const status = useSelector(state => state.todos.status)
    const error = useSelector(state => state.todos.error)
    const loginInfo = useSelector(state => selectLogin(state))
    useEffect(() => {
        if (status === 'idle') {

            dispatch(fetchTodo(loginInfo.userInfo.userId))
        }
    }, [dispatch, status])

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