import React from 'react'
import { Link } from 'react-router-dom';
import dcLogo from '../img/DC_Comics_logo.svg.png'
import marvelLogo from '../img/Marvel_Logo.svg.png'
import HouseOfHeroesLogo from '../img/house-of-heroes-logo.png'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate(); 
  return (
    <div className="grid-container">
      <div className="item item-1 backgroundImgHome"></div>
      <div className="item item-2 gridDc"></div>  
      <div className="item item-3">
        <div className='logoContainer'>
          <img src={HouseOfHeroesLogo} style= {{width:"300px"}} alt='HH logo' />
        </div>
        <div className="homeCard">
          <p>Welcome to House of heroes, the best page of the comics community, if you are new to this world, here you will find the best way to enjoy the experience of continuity in the comics world. On the other hand, if you have some experience, you will enjoy your self exploring through the different stages of comics since the beginning and also, contribute to this great community </p>
          <p>People often get very confused when it comes to the reading order of comics, normally you start reading a comic and start an ongoing story with no context, so that takes then fun of it or makes you quit since you are in the middle off nowhere.</p>
        </div>
        <div className="homeCard">
          <p>In House of Heroes we make it easy for you, every big brand (DC or Marvel) complete storyline is divided in PARTS, every part has a number of EVENTS that have a beggining and an end. And finally every EVENT has ISSUES. Feel free to check out the parts and their descriptions, and hop in the most interesting for you! </p>
          <p>First of all, select you favorite universe and enjoy!</p>
        </div>
        <div className="homeCard">          
          <p>Remember to signup to enjoy all the benefits of the comic community!</p>
        </div>
        <button className='genericButton genButtonRest' onClick={() => navigate(`/Signup`)}>Signup</button>
        <div className='logoCardContainer'>
        
         <Link to={`/parts/DC`}>
          <div className="logoCard ">
            <img src= {dcLogo} style= {{width:"80px"}} alt = "DC logo"/>
          </div>         
         </Link>        
        
          <Link to={`/parts/MARVEL`}>
            <div className="logoCard " >
              <img className="marvelLogo" src= {marvelLogo} style= {{width:"100px"}} alt = "Marvel logo" /> 
            </div>         
          </Link>
        
        </div>
      </div>
      <div className="item item-4 gridMarvel"></div>    
    </div>
  )
}

