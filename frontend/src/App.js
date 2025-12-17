import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({
      name: "",
      age: "",
      place: "", 
      image: null});

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/persons/");
    setPersons(res.data);
  };
  const handleSubmit = async (e) => {
      e.preventDefault();

  const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("age", formData.age);
    fd.append("place", formData.place);
    if (formData.image) fd.append("image", formData.image);

    if (editId) {
      await axios.patch(`http://127.0.0.1:8000/api/persons/${editId}/`,fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setEditId(null);
    } else {
      await axios.post("http://127.0.0.1:8000/api/persons/",fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    setFormData({ name: "", age: "", place: "", image: null });
    fetchPersons();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/persons/${id}/`);
    fetchPersons();
  };

  const handleEdit = (p) => {
    setFormData({
      name: p.name,
      age: p.age,
      place: p.place,
      image: null
    });
    setEditId(p.id);
  };

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type='number'
          placeholder='Age'
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />

        <input
          type='text'
          placeholder='Place'
          value={formData.place}
          onChange={(e) => setFormData({ ...formData, place: e.target.value })}
          required
        />

        <input
          type='file'
          accept='image/*'
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />

        <button type='submit'>{editId ? "Update" : "Add"}</button>
      </form>

      <ul className='list'>

        {persons.map((p) => (
          <li key={p.id}>
            {p.name} - {p.age} - {p.place}

            {p.image && (
              <img
               src={p.image}   
                alt={p.name}
                width="80"
                style={{ marginLeft: "10px", borderRadius: "6px" }}/>
              )}

            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}
export default App;

