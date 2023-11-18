import {React, useState} from "react";

function TodoList({todoList, handleDelete}) {
    return (
        todoList.map((todo) => {
            return (
            <div className="row" key={todo.id}>
                <div className="col-6">
                    <li>{todo.name}</li>
                </div>
                <div className="col-6">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
            </div>
            );
        })
    )
}


function Form({addTodo, handleChange, editTodo, updateTodo}) {
    return (
        <form className="row g3" onSubmit={addTodo}>
            <div className="col-10">
                <input type="text" className="form-control" id="todo-input" placeholder="Enter the todo" name='name' onChange={handleChange}></input>
            </div>
            <div className="col-2">
                <button type="submit" className="btn btn-primary mb-3">Add</button>
            </div>
        </form>
    );
}

export default function Todo() {
    const [todo, setTodo] = useState([]);
    const [formData, setFormData] = useState({id:0, name:''});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formData['id'] += 1
        setTodo([...todo, formData])
    }

    const handleDelete = (todoId) => {
        const newTodo = todo.filter((todo) =>  todo.id != todoId);
        setTodo(newTodo)
    }

    return (
        <div className="col-md-6 mx-auto">
        <h1 className="text-center">Todo</h1>
        <Form addTodo={handleSubmit} handleChange={handleChange} />
        <TodoList todoList={todo} handleDelete={handleDelete} handleEdit={handleEdit}/>
        </div>
    );
}