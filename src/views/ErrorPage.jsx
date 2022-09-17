import React from 'react'
import errorImage from '../img/error-image.png'

export default function ErrorPage() {
  return (
    <>

    <img className='errorImage' src={errorImage} alt='error img' />
    <div className='errorMessage'>404 - Page not found</div>
    <div className= 'subErrorMessage'> Oops! did you write the URL upside down? go back and get it right!</div>

    </>
  )
}
