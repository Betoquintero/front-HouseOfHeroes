import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
    <div>Home</div>
    <p><Link to={`/parts/DC`}>DC</Link></p>
    <p><Link to={`/parts/MARVEL`}>MARVEL</Link></p>
    </>
  )
}
