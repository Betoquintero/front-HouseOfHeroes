import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditProject() {
  const navigate = useNavigate();

  const { id, universe } = useParams();
  const [part, setPart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const part = await axios.get(`http://localhost:8000/api/v1/parts/${universe}/${id}`);
        setPart(part.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id, universe])

  const handleChange = (e) => {
    setPart(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editedPart = await axios.put(`http://localhost:8000/api/v1/parts/${id}`, part);
      navigate(`/parts/${editedPart.data.data.universe}/${editedPart.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Edit Part</h1>
      {!part && <p>Loading</p>}
      {part && (
        <form onSubmit={handleSubmit}>
            <input type="text" name="universe" placeholder="DC or MARVEL" value={part.universe} onChange={handleChange} />
            <input type="text" name="name" placeholder="Part name" value={part.name} onChange={handleChange} />
            <input type="text" name="years" placeholder="Publication year(s)" value={part.years} onChange={handleChange} />
            <input type="text" name="description" placeholder="Description" value={part.description} onChange={handleChange} />
          <button type="submit">Save changes</button>
        </form>
      )}
    </div>
  )
}