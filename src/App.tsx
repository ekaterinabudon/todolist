import React, { useState } from 'react';
import { Trash2, Check } from 'lucide-react';

// Add this interface before the TodoApp component
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([
        ...todos, 
        { 
          id: Date.now(), 
          text: inputValue.trim(), 
          completed: false 
        }
      ]);
      setInputValue('');
    }
  };

  // Toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle input key press (allow Enter to add todo)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      
      <div className="flex mb-4">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className="flex items-center justify-between p-2 border-b last:border-b-0 hover:bg-gray-50"
          >
            <span 
              className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.text}
            </span>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => toggleTodo(todo.id)}
                className="text-green-500 hover:text-green-600"
                title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check size={20} />
              </button>
              
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600"
                title="Delete task"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No tasks yet. Add a new task above!
        </p>
      )}
    </div>
  );
};

export default TodoApp;