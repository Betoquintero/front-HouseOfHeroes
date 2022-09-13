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
    <div className="grid-container">
        <div className="item item-1 backgroundImgHome"></div>
        <div className="item item-2 gridDc"></div>  
        <div className="item item-3">
            <form className='form' onSubmit={handleSubmit}>        
                <input className='formBox' type="text" name="universe" placeholder="DC or MARVEL" value={event.universe} onChange={handleChange} />
                <input className='formBox' type="text" name="name" placeholder="Issue name" value={event.name} onChange={handleChange} />
                <input className='formBox' type="text" name="years" placeholder="Publication year(s)" value={event.years} onChange={handleChange} />
                <input className='formBox' type="text" name="previousEvent" placeholder="Previous event" value={event.previousEvent} onChange={handleChange} />
                <input className='formBox' type="text" name="nextEvent" placeholder="Next event" value={event.nextEvent} onChange={handleChange} />
                <input className='formBox' type="text" name="description" placeholder="Description" value={event.description} onChange={handleChange} />
                <input className='formBox' type="text" name="summary" placeholder="Issue summary" value={event.summary} onChange={handleChange} />        
                <button type="submit">Save</button>
            </form>
        </div>
        <div className="item item-4 gridMarvel"></div> 
    </div>
  )
}