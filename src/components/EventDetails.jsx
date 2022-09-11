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
    <>
      
      {event && (        
        <div className="grid-container">
        <div className= {event.universe ==='DC' ? 'item-1 backgroundImgDc' : 'item-1 backgroundImgMarvel' }> </div>
        <div className= {event.universe ==='DC' ? 'item-2 gridDc' : 'item-2 gridMarvel' }>2</div>
        <div className="item item-3">
          <div className="infoCard">          
            <p>Event: {event.name}</p>
            <p>Year published: {event.years}</p>
            <p>Description: {event.description}</p>
          </div>
            <div  className="cardsContainer">
            {event.issues && event.issues.map(issue => {
          return ( 
            <div key={issue._id} className='card'>
            <Link to={`/issues/${issue._id}`}>
              <img src={issue.image} alt="Issue" style= {{width:"100%"}} />
              <div className="container">
                  <h4>{issue.name}</h4>             
              </div> 
            </Link>
          </div>
          )
        })}
        </div> 

            <button className= {event.universe ==='DC' ? 'buttonDc' : 'buttonMarvel' } onClick={handleDelete}>Delete event</button>
            <button className= {event.universe ==='DC' ? 'buttonDc' : 'buttonMarvel' } onClick={() => navigate(`/events/edit/${id}`)}>Edit event</button>
        </div>
          <div className= {event.universe ==='DC' ? 'item-4 gridDc' : 'item-4 gridMarvel' }>4</div>
        </div>
        )}
      {!event && <p>Event not found</p>}
    </>
  )
}

