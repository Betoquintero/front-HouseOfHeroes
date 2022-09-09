import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { Link }from 'react-router-dom';

export default function ProjectDetails() {
  // const params = useParams(); then use with params.id
  const { id } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/events/${id}`)
        //console.log(response);
        setEvent(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Project deleted successfully')
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p>Event details</p>
      {event && (
        <div>
          <h6>Project: {event.name}</h6>
          <p>Description: {event.description}</p>
          <div  className="cardsContainer">
          {event.issues && event.issues.map(issue => {
        return ( 
          <div key={issue._id} className='card'>
          <Link to={`/issues/${issue._id}`}>
            <img src={issue.image} alt="Issue" style= {{width:"100%"}} />
            <div className="container">
                <h4><b>{issue.name}</b></h4>             
            </div> 
          </Link>
        </div>
        )
      })}
      </div> 

          <button onClick={handleDelete}>Delete event</button>
          <button onClick={() => navigate(`/events/edit/${id}`)}>Edit event</button>
        </div>)}
      {!event && <p>Event not found</p>}
    </div>
  )
}