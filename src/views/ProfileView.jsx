import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { Link }from 'react-router-dom';

export default function ProfileView() {
  const { id } = useParams();
  const storedToken = localStorage.getItem('authToken');

  const [collection, setCollection] = useState({
    userId: '',
    issues: [],
    events:[]
  })


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/collections`,  { headers: { Authorization: `Bearer ${storedToken}` } } );
        //console.log(response);
        setCollection(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id]);

  
  
  return (
    <>    
    {collection && (
    <div className="grid-container">
      <div className="item item-1 backgroundImgHome"></div>
      <div className="item item-2 gridDc"></div>  
      <div className="item item-3">
      <h2>Welcome to your profile page!</h2>
      <div className='collectionHeaders'>
        <p className='eventProfileTitle'><strong>Event</strong></p>
        <p className='collectionProfileTitle'><strong>Collection of issues</strong></p> 
      </div>       
        <div  className="cardsContainer">
            {collection.events && collection.events.map(event => {
          return (
            <>
            <div className='eventIssue'>
            <div className='eventProfileContainer'>            
            <div key={event._id} className='card'>
            <Link className='links' to={`/events/${event._id}`}>
              <img src={event.image} alt="Issue" style= {{width:"100%"}} />
              <div className="container">
                  <h4>{event.name}</h4>             
              </div> 
            </Link>            
          </div>
          </div>
          <div  className="profileCardsContainer">          
            {event.issues && event.issues.map(issue => {
          return (
            <>
            <div key={issue._id} className='card'>
            <Link className='links' to={`/issues/${issue._id}`}>
              <img src={issue.image} alt="Issue" style= {{width:"100%"}} />
              <div className="container">
                  <h4>{issue.name}</h4>             
              </div> 
            </Link>            
          </div>
          </>                             
          )
        })}
        </div>
        </div>
        
          </>                             
          )
        })}
        </div>
      </div>
      <div className="item item-4 gridMarvel"></div>      
    </div>
    
    )}
    {!collection && <p>No collections to show</p>}

    </>
  )
}

