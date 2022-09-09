import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CreateProject() {
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    universe: '',
    name: '',
    years:'',
    previousEvent:'',
    nextEvent:'',
    image:'',
    description:'',
    summary:'',
  })

  const handleChange = (e) => {
    setEvent(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = await axios.post('http://localhost:8000/api/v1/events', event, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Event created successfully')
      navigate(`/events/${newEvent.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>        
        <input type="text" name="universe" placeholder="DC or MARVEL" value={event.universe} onChange={handleChange} />
        <input type="text" name="name" placeholder="Issue name" value={event.name} onChange={handleChange} />
        <input type="text" name="years" placeholder="Publication year(s)" value={event.years} onChange={handleChange} />
        <input type="text" name="previousEvent" placeholder="Previous event" value={event.previousEvent} onChange={handleChange} />
        <input type="text" name="nextEvent" placeholder="Next event" value={event.nextEvent} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={event.description} onChange={handleChange} />
        <input type="text" name="summary" placeholder="Issue summary" value={event.summary} onChange={handleChange} />        
        <button type="submit">Save</button>
      </form>
    </div>
  )
}