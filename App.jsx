import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!name) return;

    if (editId) {
      setItems(items.map(item => item.id === editId ? { id: editId, name } : item));
      setEditId(null);
    } else {
      setItems([...items, { id: Date.now(), name }]);
    }

    setName('');
  };

  const editItem = (id) => {
    const item = items.find(item => item.id === id);
    setName(item.name);
    setEditId(id);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React CRUD App</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addItem}>
        {editId ? 'Update' : 'Add'}
      </button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => editItem(item.id)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;