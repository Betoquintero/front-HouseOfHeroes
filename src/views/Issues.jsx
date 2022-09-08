import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

export default function Issues() {
  const [issues, setIssues] = useState(null);

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
      <h3>Check out my projects:</h3>
      {!issues && <p>Loading</p>}
      {issues && issues.map(issue => {
        return <p key={issue._id}><Link to={`/issues/${issue._id}`}>{issue.name}</Link></p>
      })}
      <Outlet />
    </div>
    </>

  )
}