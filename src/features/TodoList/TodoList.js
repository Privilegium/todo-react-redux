import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddTodoInput from '../AddTodoInput/AddTodoInput';
import TodoListItem from "../TodoListItem/TodoListItem";
import { todoDeleted, todoComplete, fetchTodos, selectAll } from "./todoSlice";
import { useHttp } from "../hooks/http.hook";
import store from "../../app/store";

import './TodoList.scss'

const TodoList = () => {

    const filteredTodos = selectAll(store.getState())
    const {todosLoadingStatus} = useSelector(state => state.todos)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchTodos())
        // eslint-disable-next-line
    }, [])

    const onDeleteTodo = useCallback((id) => {
        request(`http://localhost:3001/todos/${id}`, 'DELETE')
            .then(dispatch(todoDeleted(id)))
            .catch(e => console.log(e))
            // eslint-disable-next-line
    }, [request]);

    const onCompleteTodo = useCallback((id, completeness) => {
        request(`http://localhost:3001/todos`)
            .then(dispatch(todoComplete({id: id, changes: {completeness: !completeness}})))
            .catch(e => console.log(e))
        // eslint-disable-next-line
    }, [request])

    if (todosLoadingStatus === 'loading') {
        return <h3>Loading...</h3>
    } else if (todosLoadingStatus === 'error') {
        return <h3>Oooops...Something went wrong</h3>
    }

    const renderTodosList = (arr) => {
        if (arr.length === 0) {
            return <h3>No todos created yet</h3>
        } else {
            return arr.map(({id, completeness, ...props}) => {
                return <TodoListItem 
                            onCompleteTodo={() => onCompleteTodo(id, completeness)} 
                            onDeleteTodo={() => onDeleteTodo(id)} 
                            key={id} 
                            completeness={completeness}
                            {...props} />
            })
        }
    }

    const todos = renderTodosList(filteredTodos)

    return (
        <div className="container_todolist">
            <div className="container_todolist--content">
                <AddTodoInput/>
                <ul className="todolist">
                    {todos}
                </ul>
            </div>
        </div>
    )
}

export default TodoList;