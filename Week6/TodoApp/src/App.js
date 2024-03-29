import { useState } from "react";

import "./css/style.css";

import binImage from "./images/bin.png";


const initialTodos = [
    { id: 0, task: "Take out the trash", completed: false },
    { id: 1, task: "Walk the dog", completed: true },
    { id: 2, task: "Do the weekly quizzes", completed: false },
];


function Todo({ task, completed, toggleCompleted, removeTodo }) {
    const taskStyle = () => {
        let result = { display: "inline-block" };
        if (completed) {
            result["textDecoration"] = "line-through";
        }
        return result;
    };

    return (
        <section>
            <div>
                <input type="checkbox" checked={completed} onChange={toggleCompleted} />
                <p style={taskStyle()}>
                    {task}
                </p>
            </div>
            <DeleteButton removeTodo={removeTodo} />
        </section >
    );
}


function DeleteButton({ removeTodo }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        removeTodo();
    };

    return (
        <form onSubmit={handleSubmit} className="delete">
            <button type="submit">
                <img src={binImage} height="20px" width="20px" alt="bin" />
            </button>
        </form>
    );
}


function NewTodoForm({ sortTodos, setTodos }) {
    const [task, setTask] = useState("");
    const [nextId, setId] = useState(initialTodos.length);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos((todos) => [...todos, { id: nextId, task, completed: false }].sort(sortTodos));
        setId(nextId + 1);
        setTask("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="task">Task:</label>
            <input
                type="text"
                id="task"
                name="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}


function App() {
    const sortTodos = (todo, otherTodo) => todo.id - otherTodo.id;

    const [todos, setTodos] = useState(initialTodos.sort(sortTodos));

    const toggleCompleted = (todo) => {
        setTodos(todos.map(_todo => _todo === todo
            ? { ...todo, completed: !todo.completed } : _todo));
    };

    const removeTodo = (todo) => {
        setTodos(todos.filter(_todo => _todo.id !== todo.id).sort(sortTodos));
    };

    return (
        <>
            <header>
                <h1>Todo App</h1>
            </header>
            <main>
                <h2>List of Todos</h2>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        {...todo}
                        toggleCompleted={() => toggleCompleted(todo)}
                        removeTodo={() => removeTodo(todo)}
                    />
                ))}
                <NewTodoForm sortTodos={sortTodos} setTodos={setTodos} />
            </main>
        </>
    );
}


export default App;