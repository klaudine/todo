import { useState, useEffect } from 'react';



function TodoItem({label, isDone, toggleTodo, deleteTodo}) {
    return (
        <div className='todo-item'>
        <input type='checkbox' checked={isDone} onChange={toggleTodo}></input>
        <span className='todo-text'>{label}</span>
        <button type="button" className='btn btn-danger' onClick={deleteTodo}>Delete</button>
    </div>
    )
}

function App() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');

    useEffect(() => {
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
            setTodos(JSON.parse(localTodos))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

  return (
    <>
    <form onSubmit={(ev) => {ev.preventDefault();
    if (todoInput.length > 0) {
        setTodos([{
            label: todoInput,
            isDone: false,
        },
        ...todos,
    ])
    }
    }}
    className="container d-flex flex-column align-items-center justify-content-start">
    <h1>Todo List</h1>
    <input className='form-control form-control-lg' type='text' placeholder='What do you need to do?' aria-label='todo list input field'
    value={todoInput} onChange={ev => setTodoInput(ev.target.value)}
    ></input>
    {todos.map((item, idx) => ( 
        <TodoItem key={idx} label={item.label} isDone={item.isDone}
        toggleTodo={() => setTodos(todos.toSpliced(idx, 1, {
            label: item.label, isDone: !item.isDone
            })
        )}
        deleteTodo={() => setTodos(todos.toSpliced(idx, 1))}
        />
    ))}
    <small>{todos.filter((item) => !item.isDone).length} todos left to do!</small>
    </form>
    </>
    
  );
}

export default App;
