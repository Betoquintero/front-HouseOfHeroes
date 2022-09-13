import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditProject() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const issue = await axios.get(`http://localhost:8000/api/v1/issues/${id}`);
        setIssue(issue.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id])

  const handleChange = (e) => {
    setIssue(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editedIssue = await axios.put(`http://localhost:8000/api/v1/issues/${id}`, issue);
      navigate(`/issues/${editedIssue.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>      
      {!issue && <p>Loading</p>}
      {issue && (
        <div className="grid-container"> 
            <div className="item item-1 backgroundImgHome"> </div>
            <div className="item item-2 gridDc"></div>
            <div className="item item-3">
            <h2>Edit issue</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <input className='formBox' type="text" name="universe" placeholder="DC or MARVEL" value={issue.universe} onChange={handleChange} />
                    <input className='formBox' type="text" name="name" placeholder="Issue name" value={issue.name} onChange={handleChange} />
                    <input className='formBox' type="text" name="years" placeholder="Publication year(s)" value={issue.years} onChange={handleChange} />
                    <input className='formBox' type="text" name="description" placeholder="Description" value={issue.description} onChange={handleChange} />
                    <input className='formBox' type="text" name="summary" placeholder="Issue summary" value={issue.summary} onChange={handleChange} /> 
                <button className='genericButton genButtonRest' type="submit">Save changes</button>
                </form>
            </div>
            <div className="item item-4 gridMarvel"></div>
        </div>
      )}
      {!issue && <p>Loading</p>}
    </div>
  )
}