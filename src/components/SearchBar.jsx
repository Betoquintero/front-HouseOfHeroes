import React from 'react'

export default function SearchBar (props){
    const {onSearch} = props;
    return (
        <div>
            <input className='formBox' placeholder='Type a name of an issue' type="text" onChange={(e)=> onSearch(e.target.value)} />
        </div>
    )
}