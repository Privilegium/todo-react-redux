import './todoListItem.scss'

const TodoListItem = ({name, completeness, onDeleteTodo, onCompleteTodo}) => {

    return (
        <li className="todo-card">
            <h3 onClick={onCompleteTodo} className={`todo-card-title ${completeness ? 'done' : ''}`}>{name}</h3>
            <span onClick={onDeleteTodo} className="material-symbols-outlined">close</span>
        </li>
    )
}

export default TodoListItem;