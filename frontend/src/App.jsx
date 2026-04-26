import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    // TODO (Student): Add missing fields for the state
  });

  const fetchItems = async () => {
    try {
      const res = await axios.get('${import.meta.env.VITE_API_URL}/api/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('${import.meta.env.VITE_API_URL}/api/items', formData);
      fetchItems(); // Refresh the list
      setFormData({
        name: '',
        price: '',
        // TODO (Student): Clear the missing fields here
      });
    } catch (err) {
      console.error('Error creating item:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };
  return (
    <div className="container">
      <h1>Item Manager</h1>

      <div className="form-section">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

           <div className="form-group">
            <label>Name:</label>
            <textarea
              type="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

           <div className="form-group">
            <label>category:</label>
            <select
              type="text"
              name="category"
              value={formData.name}
              onChange={handleChange}
              required
            >

            <option value="">--select catagory</option>
            <option value="electronics">electronics</option>
            <option value="edfger">erjyjy</option>
            </select>
          </div>

          {/* TODO (Student): Add input fields for 'description' and 'category' here */}

          <button type="submit" className="btn-primary">Add Item</button>
        </form>
      </div>

      <div className="list-section">
        <h2>Items List</h2>
        {items.length === 0 ? (
          <p>No items found. Add some!</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <li key={item._id} className="item-card">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>{item.description}</p>
                  <p>category: ${item.category}</p>
                  {/* TODO (Student): Display 'description' and 'category' here */}
                </div>
                <div className="item-actions">
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
