import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Link }from 'react-router-dom';

export default function ProfileView() {
  const { id } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const { user } = useContext(AuthContext);

  const [collection, setCollection] = useState({
    userId: '',
    issues: [],
    events:[]
  })


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/collections`,  { headers: { Authorization: `Bearer ${storedToken}` } } );
        //console.log(response);
        setCollection(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id, storedToken]);  
  
  return (
    <>    
    <div className="grid-container">
      <div className="item item-1 backgroundImgHome"></div>
      <div className="item item-2 gridDc"></div>  
      <div className="item item-3">
      <img className='profileUserImg'  style= {{width:"100px"}} src={user.imageUrl} alt='user profile pic' />
      <h5>Welcome to your profile page {user.username}!</h5> 
      <p className='profileDescription'><strong>Below you will find your saved collections, if you don't have any, visit the events and collections pages to find the ones you like the most!</strong></p>     
      <div className='collectionHeaders'>
        <p className='eventProfileTitle'><strong>Event</strong></p>
        <p className='collectionProfileTitle'><strong>Collection of issues</strong></p> 
      </div>       
        <div  className="cardsContainer">
            {collection && (
            collection.events.map(event => {
          return (
            <div key={event._id} >
            <div className='eventIssue'>
            <div className='eventProfileContainer'>            
            <div  className='card'>
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
            <div key={issue._id}>
            <div  className='card'>
            <Link className='links' to={`/issues/${issue._id}`}>
              <img src={issue.image} alt="Issue" style= {{width:"100%"}} />
              <div className="container">
                  <h4>{issue.name}</h4>             
              </div> 
            </Link>            
          </div>
          </div>                             
          )
        })}
        </div>
        </div>        
          </div>                             
          )
        })
        )}
        {!collection && <p className= 'noCollections'><strong>No collections to show, pick one and start collecting!</strong></p>}
        </div>
      </div>
      <div className="item item-4 gridMarvel"></div>      
    </div>
    </>
  )
}

