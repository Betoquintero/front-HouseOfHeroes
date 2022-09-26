import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Issues() {
  const [parts, setParts] = useState(null);
  const { universe } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/parts/${universe}`)
        //console.log(response)
        setParts(response.data.data);
      } catch (error) {
        console.error(error)
      }
    }
    getData();
  }, [universe])


  return (
    <div className="grid-container">
        <div className= {universe ==='DC' ? 'item-1 backgroundImgDc' : 'item-1 backgroundImgMarvel' }> </div>
        <div className= {universe ==='DC' ? 'item-2 gridDc' : 'item-2 gridMarvel' }></div>
        <div className="item item-3">        
          <div>        
            {!parts && <p>Loading</p>}
            <div className='partsHeader'><strong>Welcome to the {universe} section!</strong></div>
            <div className='partsSubHeader'>Below you will find all of the {universe} parts. Read them carefully and enter to the most interesting!</div>
            <div className='cardsContainer'>
            {parts && parts.map(part => {
                return (
                  <>                
                    <div className='partCard' key={part._id}>
                    <Link className='links' to={`/parts/${part.universe}/${part._id}`}>
                        <p><strong>{part.name}</strong></p>
                        <p><strong>Years published: </strong>{part.years}</p>
                        <p>{part.description}</p>
                    </Link>
                    </div>
                  </>
                )
            })}
            </div>        
            <button className='genericButton genButtonRest' onClick={() => navigate(`/parts/create`)}>Create Part</button>
            <Outlet />
          </div>
        </div>
        <div className= {universe ==='DC' ? 'item-4 gridDc' : 'item-4 gridMarvel' }></div> 
    </div>

  )
}