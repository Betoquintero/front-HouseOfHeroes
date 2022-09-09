import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Issues() {
  const [issues, setIssues] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/issues')
        console.log(response)
        setIssues(response.data.data);
      } catch (error) {
        console.error(error)
      }
    }
    getData();
  }, [])


  return (
    <>
    <div>Issues</div>
        <div>
      <h3>All Issues:</h3>
      {!issues && <p>Loading</p>}
      {issues && issues.map(issue => {
        return <p key={issue._id}><Link to={`/issues/${issue._id}`}>{issue.name}</Link></p>
      })}
      <button onClick={() => navigate(`/issues/create`)}>Create issue</button>
      <Outlet />
    </div>
    </>

  )
}