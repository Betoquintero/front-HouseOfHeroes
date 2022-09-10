import React from 'react'
import { Link } from 'react-router-dom';
import dcLogo from '../img/DC_Comics_logo.svg.png'
import marvelLogo from '../img/Marvel_Logo.svg.png'


export default function Home() {
  return (
    <div className="grid-container">
      <div class="item item-1">
        
      </div>
      <div class="item item-2">2</div>  
      <div class="item item-3">3
        <div className="genCard">
          <p>Welcome to House of heroes, the best page of the comics community</p> 
        </div>
        <div className="genCard">
         <Link to={`/parts/DC`}>
           <img src= {dcLogo} style= {{width:"80px"}} alt = "DC logo"/>          
         </Link>
        </div>
        <div className="genCard">
          <Link to={`/parts/MARVEL`}>
            <img src= {marvelLogo} style= {{width:"100px"}} alt = "Marvel logo" />          
          </Link>
        </div>
      </div>
      <div class="item item-4">4</div>    
    </div>
  )
}

