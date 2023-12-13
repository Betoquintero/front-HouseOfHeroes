import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Link }from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProfileView() {
  const { id } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const [collection, setCollection] = useState({
    userId: '',
    issues: [],
    events:[]
  })

  const [issueCollection, setissueCollection] = useState({
    userId: '',
    issues: [],
    events:[]
  })

  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/collections`,  { headers: { Authorization: `Bearer ${storedToken}` } } );        
        setCollection(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id, storedToken]);  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/collections/issue`,  { headers: { Authorization: `Bearer ${storedToken}` } } );        
        setissueCollection(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id, storedToken]);



  const handleDeleteEvent = async (id) => {   
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/collections/delete-event/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });      
      toast.success('Event collection deleted successfully')
      navigate('/');   
    } catch (error) {
      console.error(error);
    }
  }   
  
  const handleDeleteIssue = async (id) => {   
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/collections/delete-issue/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });      
      toast.success('Issue deleted successfully')
      navigate('/profile');   
    } catch (error) {
      console.error(error);
    }
  }

  const toggleReadStatus = async (issueId) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/readStatuses/toggle-read/${issueId}`, {}, { 
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      setCollection(prevCollection => {
        const updatedEvents = prevCollection.events.map(event => {
          const updatedIssues = event.issues.map(issue => 
            issue._id === issueId ? { ...issue, readStatus: response.data.isRead } : issue
          );
          return { ...event, issues: updatedIssues };
        });
  
        return { ...prevCollection, events: updatedEvents };
      });
      toast.success('Issue read status updated');
    } catch (error) {
      console.error('Error toggling read status:', error);
      toast.error('Failed to update issue read status');
    }
  };
  
  
  
  return (
    <div className="grid-container">
      <div className="item item-1 backgroundImgHome"></div>
      <div className="item item-2 gridDc"></div>  
      <div className="item item-3">
      <img className='profileUserImg'  style= {{width:"100px"}} src={user.imageUrl} alt='user profile pic' />
      <h5>Welcome to your profile page {user.username}!</h5>
      <Link className='links' to={`/user/edit`}><button className= 'editProfile'>Edit your profile</button></Link>       
      <p className='profileDescription'><strong>Below you will find your saved collections, if you don't have any, visit the events and collections pages to find the ones you like the most!</strong></p>     
      <div className='collectionHeaders'>
        <p className='eventProfileTitle'><strong>Event</strong></p>
        <p className='collectionProfileTitle'><strong>Collection of issues</strong></p> 
      </div>       
      <div className="cardsContainer">
        {collection && collection.events.map(event => {
          return (
            <div key={event._id} className='eventIssue'>
              <div className='eventProfileContainer'>            
                <div className='card'>
                  <Link className='links' to={`/events/${event._id}`}>
                    <img src={event.image} alt="Issue" style= {{width:"100%"}} />
                    <div className="container">
                        <h4>{event.name}</h4>             
                    </div> 
                  </Link>            
                </div>
                <div className='deleteCollectionContainer'>
                  <button className= 'deleteEventCollection' onClick={() => handleDeleteEvent(event._id)}>Delete event</button>
                </div>
              </div>
              <div className="profileCardsContainer">          
                {event.issues && event.issues.map(issue => {
                  return (
                    <div key={issue._id} style={{ opacity: issue.readStatus ? 0.5 : 1 }}>
                      <div className='card'>
                        <Link className='links' to={`/issues/${issue._id}`}>
                          <img src={issue.image} alt="Issue" style= {{width:"100%"}} />
                          <div className="container">
                              <h4>{issue.name}</h4>             
                          </div> 
                        </Link>            
                      </div>
                      <button onClick={() => toggleReadStatus(issue._id)}>
                        {issue.readStatus ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                      <div className='deleteCollectionContainer'>
                        <button className= 'deleteEventCollection' onClick={() => handleDeleteIssue(issue._id)}>Delete Issue</button>
                      </div>
                    </div>                             
                  )
                })}
              </div>
            </div>                             
          )
        })}
      </div>
      {!collection && <p className= 'noCollections'><strong>No collections to show, pick one and start collecting!</strong></p>}
      <div className='collectionHeaders'>
        <p className='issuesProfileTitle'><strong>Individual issues that I'd like to read</strong></p>        
      </div> 
      <div className="profileIssuesContainer">          
        {issueCollection && issueCollection.issues.map(issue => {
          return (
            <div key={issue._id} style={{ opacity: issue.readStatus ? 0.5 : 1 }}>
              <div className='card'>
                <Link className='links' to={`/issues/${issue._id}`}>
                  <img src={issue.image} alt="Issue" style= {{width:"100%"}} />
                  <div className="container">
                      <h4>{issue.name}</h4>             
                  </div> 
                </Link>            
              </div>          
              <button onClick={() => toggleReadStatus(issue._id)}>
                {issue.readStatus ? 'Mark as Unread' : 'Mark as Read'}
              </button>
              <div className='deleteCollectionContainer'>
                <button className= 'deleteEventCollection' onClick={() => handleDeleteIssue(issue._id)}>Delete Issue</button>
              </div>
            </div>                             
          )
        })}        
      </div>
      {!issueCollection && <p className= 'noIssue'><strong>No issues to show, pick one and start collecting!</strong></p>}
      </div>
      <div className="item item-4 gridMarvel"></div> 
      </div>
  )
  }

