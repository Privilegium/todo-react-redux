import { useHttp } from "../hooks/http.hook"
import { useDispatch } from "react-redux";
import { todoCreated } from "../TodoList/todoSlice";

import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import './AddTodoInput.scss'

const AddTodoInput = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                todo: ''
            }}
            validationSchema={Yup.object({
                todo: Yup.string()
                        .min(2, 'Minimum 2 symbols')
                        .required('Required field')
            })}
            onSubmit={(values, {resetForm}) => {
                const newTodo = {
                    id: uuidv4(),
                    name: values.todo,
                    completeness: "outstanding"
                }

                request('http://localhost:3001/todos', 'POST', JSON.stringify(newTodo))
                        .then(dispatch(todoCreated(newTodo)))
                        .catch((e) => console.log(e))

                resetForm();
            }}
            >
            <Form className="todo-input">
                <Field required
                    type="text"
                    name='todo'
                    className="todo-input-field"
                    id="name"
                    placeholder="Type your todo"
                    />
                <button type="submit" className="todo-input--btn">Add</button>
            </Form>
        </Formik>
    )
} 

export default AddTodoInput;