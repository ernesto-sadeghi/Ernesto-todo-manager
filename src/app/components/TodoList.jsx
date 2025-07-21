import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, sortedFilteredTodoIds, } from "../todoSlice";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { selectLogin } from "../userSlice";

function TodoList() {

    const todoIds = useSelector(sortedFilteredTodoIds)
    // const reversedtodoIds = [...todoIds].reverse();

    const dispatch = useDispatch()
    const todoStatus = useSelector(state => state.todos.status)
   
    const error = useSelector(state => state.todos.error)
    const loginInfo = useSelector(state => selectLogin(state))
    useEffect(() => {
        if (
            todoStatus === 'idle' &&
            loginInfo.userInfo.islogin &&        
            loginInfo.userInfo.userId            
        ) {
            dispatch(fetchTodo(loginInfo.userInfo.userId));
        }
    }, [dispatch, todoStatus, loginInfo]);

    let content
    if ('loading' === todoStatus) {
        content = <div className="loader">loading ...</div>
    } else if ('success' === todoStatus) {
        content = todoIds.map(id => <TodoItem todoId={id} key={id} />)
        // content = reversedtodoIds.map(id => <TodoItem todoId={id} key={id} />)
    } else if ('error' === todoStatus) {
        content = <div className="error">{error}</div>
    }



    return (<div className="space-y-3">
        {content}
    </div>);
}

export default TodoList;