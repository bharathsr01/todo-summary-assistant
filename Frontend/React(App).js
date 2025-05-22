import React, { useEffect, useState } from 'react';
import axios from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    const res = await axios.post('/todos', { text });
    setTodos([...todos, res.data]);
    setText('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
    fetchTodos();
  };

  const handleSummarize = async () => {
    const res = await axios.post('/todos/summarize');
    alert(`Summary sent to Slack: ${res.data.summary}`);
  };

  return (
    <div>
      <h2>Todo Summary Assistant</h2>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.text} <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSummarize}>Summarize & Send to Slack</button>
    </div>
  );
}

export default App;
