import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Issues() {
  const [parts, setParts] = useState(null);
  const { universe } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/parts/${universe}`)
        //console.log(response)
        setParts(response.data.data);
      } catch (error) {
        console.error(error)
      }
    }
    getData();
  }, [universe])


  return (
    <>
    <div>Parts</div>
        <div>
      <h3>Check out my projects:</h3>
      {!parts && <p>Loading</p>}
      {parts && parts.map(part => {
        return <p key={part._id}><Link to={`/parts/${part.universe}/${part._id}`}>{part.name}</Link></p>
      })}
      <button onClick={() => navigate(`/events/create`)}>Create event</button>
      <Outlet />
    </div>
    </>

  )
}