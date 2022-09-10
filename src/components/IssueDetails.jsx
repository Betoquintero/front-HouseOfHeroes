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
      <p>Issue Details</p>
      {issue && (
        <div>
          <h6>Issue: {issue.name}</h6>
          <p>Description: {issue.description}</p>

          <button onClick={handleDelete}>Delete issue</button>
          <button onClick={() => navigate(`/issues/edit/${id}`)}>Edit issue</button>
        </div>)}
      {!issue && <p>Issue not found</p>}

      <form onSubmit={handleSubmit}>        
        <input type="text" name="comment" placeholder="Place your comment here..." value={newComment.comment} onChange={handleChange} />       
        <button type="submit">Save</button>
      </form>      

      {!comment && <p>No comments to show</p>}
      {comment && comment.map(elem => {
        return (
        <div key={elem._id}>
            <p>{elem.userId.username} said:</p>
            <p>{elem.comment}</p>
        </div>
        )
      })}
      

    </div>
  )
}
