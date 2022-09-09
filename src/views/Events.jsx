import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

export default function Issues() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/events')
        console.log(response)
        setEvents(response.data.data);
      } catch (error) {
        console.error(error)
      }
    }
    getData();
  }, [])


  return (
    <>
    <div>Issues</div>
        <div>
      <h3>Check out my projects:</h3>
      {!events && <p>Loading</p>}
      {events && events.map(event => {
        return <p key={event._id}><Link to={`/events/${event._id}`}>{event.name}</Link></p>
      })}
      <Outlet />
    </div>
    </>

  )
}