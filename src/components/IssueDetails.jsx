import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProjectDetails() {
  // const params = useParams(); then use with params.id
  const { id } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [comment, setComment] = useState(null)
  const [newComment, setNewComment] = useState({
    comment: '',
  })

  const handleChange = (e) => {
    setNewComment(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/v1/comments/${id}`, newComment, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Comment created successfully')
      const response = await axios.get(`http://localhost:8000/api/v1/comments/${id}`)      
      setComment(response.data.data)
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/issues/${id}`)
        //console.log(response);
        setIssue(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id]);

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/comments/${id}`)
        //console.log(response);
        setComment(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getComment();
  }, [id]);



  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/issues/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Issue deleted successfully')
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>      
      {issue && (        
        <div className="grid-container">
            <div className= {issue.universe ==='DC' ? 'item-1 backgroundImgDc' : 'item-1 backgroundImgMarvel' }> </div>
            <div className= {issue.universe ==='DC' ? 'item-2 gridDc' : 'item-2 gridMarvel' }></div>
            <div className="item item-3">
                <div className='infoCard'>        
                    <h3>Issue: {issue.name}</h3>
                    <p><strong>Year published:</strong> {issue.years}    </p>
                    <p><strong>Description:</strong> {issue.description}</p>
                </div>
                <div className='titleOfDetailImage'><strong>Issue Image</strong></div>
                <div className='detailImage'><img src={issue.image} style= {{width:"200px"}} alt='item img' /> </div>
                <div className='buttonContainer buttonContainerDetails'>                            
                    <button className= {issue.universe ==='DC' ? 'buttonDc' : 'buttonMarvel' } onClick={() => navigate(`/issues/create`)}>Create Issue</button>
                    <button className= {issue.universe ==='DC' ? 'buttonDc' : 'buttonMarvel' } onClick={handleDelete}>Delete issue</button>
                    <button className= {issue.universe ==='DC' ? 'buttonDc' : 'buttonMarvel' } onClick={() => navigate(`/issues/edit/${id}`)}>Edit issue</button>
                </div> 
          <div className='titleOfDetailImage'><strong>Comments on this Issue</strong></div>
            <form className='form' onSubmit={handleSubmit}>        
                <input className='formBox commentFormBox' type="text" name="comment" placeholder="Place your comment here..." value={newComment.comment} onChange={handleChange} />       
                <button className= {issue.universe ==='DC' ? 'buttonDc' : 'buttonMarvel' } type="submit" >Post Comment</button>
            </form>  
      {!comment && <p>No comments to show</p>}
      {comment && comment.map(elem => {
        return (
        <div key={elem._id}>
        <div className="comment-block">
            <img className="profile-img" width="40px" height="40px" src={elem.userId.imageUrl} alt='profile img'/>
            <p className="commenting-user"><strong>{elem.userId.username}</strong></p> said:     
            <p>{elem.comment}</p>
        </div>
            
        </div>
        )
      })}
        </div>
      <div className= {issue.universe ==='DC' ? 'item-4 gridDc' : 'item-4 gridMarvel' }></div>
    </div>
    )}
      {!issue && <p>Issue not found</p>}


      

    </div>
  )
}
