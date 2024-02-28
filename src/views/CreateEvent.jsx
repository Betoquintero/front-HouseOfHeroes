import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MixedGrid from '../components/MixedGrid'
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
      const newEvent = await axios.post(`${process.env.REACT_APP_API_URL}/events`, event, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Event created successfully')
      navigate(`/events/${newEvent.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MixedGrid>
        <h2>Create event</h2>
        <form className='form' onSubmit={handleSubmit}>        
          <input className='formBox' type="text" name="universe" placeholder="DC or MARVEL" value={event.universe} onChange={handleChange} />
          <input className='formBox' type="text" name="name" placeholder="Issue name" value={event.name} onChange={handleChange} />
          <input className='formBox' type="text" name="years" placeholder="Publication year(s)" value={event.years} onChange={handleChange} />
          <input className='formBox' type="text" name="previousEvent" placeholder="Previous event" value={event.previousEvent} onChange={handleChange} />
          <input className='formBox' type="text" name="nextEvent" placeholder="Next event" value={event.nextEvent} onChange={handleChange} />
          <input className='formBox' type="text" name="description" placeholder="Description" value={event.description} onChange={handleChange} />
          <input className='formBox' type="text" name="summary" placeholder="Issue summary" value={event.summary} onChange={handleChange} />        
          <button className='genericButton genButtonRest' type="submit">Save</button>
        </form>
    </MixedGrid>

  )
}