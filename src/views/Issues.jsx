import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar'

export default function Issues() {
  const [issues, setIssues] = useState(null);
  const navigate = useNavigate();
  

  const handleSearch = (searchValue) =>{
    if (searchValue===''){
        setIssues(issues)
    }else{
        const filtered = issues.filter(elem => elem.name.toLowerCase().includes((searchValue).toLowerCase()))
        setIssues(filtered)
    }
}

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/issues')
        //console.log(response)
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
      <SearchBar onSearch= {handleSearch} />
      {!issues && <p>Loading</p>}
      <div  className="cardsContainer">
      {issues && issues.map(issue => {
        return (                
          <div key={issue._id} className='card'>
            <Link to={`/issues/${issue._id}`}>
              <img src={issue.image} alt="Issue" style= {{width:"100%"}} />
              <div className="container">
                <h4><b>{issue.name}</b></h4>             
              </div>       
            </Link>
          </div>
          )          
      })}
      </div> 
      <button onClick={() => navigate(`/issues/create`)}>Create issue</button>
      <Outlet />
    </div>
    </>

  )
}

