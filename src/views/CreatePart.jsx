import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CreateProject() {
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [part, setPart] = useState({
    universe: '',
    name: '',
    years:'',
    description:'',   
  })

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
      const newPart = await axios.post('http://localhost:8000/api/v1/parts', part, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Part created successfully')
      navigate(`/parts/${newPart.data.data.universe}/${newPart.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>        
        <input type="text" name="universe" placeholder="DC or MARVEL" value={part.universe} onChange={handleChange} />
        <input type="text" name="name" placeholder="Part name" value={part.name} onChange={handleChange} />
        <input type="text" name="years" placeholder="Publication year(s)" value={part.years} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={part.description} onChange={handleChange} />       
        <button type="submit">Save</button>
      </form>
    </div>
  )
}