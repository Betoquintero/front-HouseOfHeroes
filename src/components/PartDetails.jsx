import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProjectDetails() {
  // const params = useParams(); then use with params.id
  const { id } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [part, setPart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/parts/${id}`)
        //console.log(response);
        setPart(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id]);

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
          <h6>Project: {part.name}</h6>
          <p>Description: {part.description}</p>

          <button onClick={handleDelete}>Delete part</button>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit part</button>
        </div>)}
      {!part && <p>Part not found</p>}
    </div>
  )
}