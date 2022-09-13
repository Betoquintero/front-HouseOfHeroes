import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditProject() {
  const navigate = useNavigate();

  const { id, } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const event = await axios.get(`http://localhost:8000/api/v1/events/${id}`);
        setEvent(event.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id])

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
      const editedEvent = await axios.put(`http://localhost:8000/api/v1/events/${id}`, event);
      navigate(`/events/${editedEvent.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>       
      {event && (
        <div className="grid-container"> 
            <div className="item item-1 backgroundImgHome"> </div>
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
                <button type="submit">Save changes</button>
                </form>
            </div>
            <div className="item item-4 gridMarvel"></div>
        </div>
      )}
      {!event && <p>Loading</p>}
    </div>
  )
}