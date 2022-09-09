import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { Link }from 'react-router-dom';

export default function ProjectDetails() {
  // const params = useParams(); then use with params.id
  const { id, universe } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [part, setPart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/parts/${universe}/${id}`)
        //console.log(response);
        setPart(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id, universe]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/parts/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Project deleted successfully')
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p>Part details</p>
      {part && (
        <div>
          <h6>Part: {part.name}</h6>
          <p>Description: {part.description}</p>
          <div  className="cardsContainer">
          {part.events && part.events.map(event => {
        return ( 
            <div key={event._id} className='card'>
            <Link to={`/events/${event._id}`}>
                <img src={event.image} alt="Issue" style= {{width:"100%"}} />
                <div className="container">
                    <h4><b>{event.name}</b></h4> 
                </div>
            </Link>
        </div>
        )
      })}
        </div> 
          <button onClick={handleDelete}>Delete part</button>
          <button onClick={() => navigate(`/parts/edit/${part.universe}/${id}`)}>Edit part</button>
        </div>)}
        
      {!part && <p>Part not found</p>}
    </div>
  )
}