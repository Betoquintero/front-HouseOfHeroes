import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Profile() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('authToken');
  const { user, logOutUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    imageUrl:''
  })

  const handleChange = (e) => {
    setUserData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleFileUpload = async(e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/upload`, uploadData);   

      setUserData(prev => {
        return {
          ...prev,
          imageUrl: response.data.fileUrl
        }
      })
    } catch (error) {
        console.error(error);
      }
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, userData, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('User edited successfully. Please log in again.');
      logOutUser();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  

  
  return (
    <div className="grid-container">
        <div className="item item-1 backgroundImgHome"></div>
        <div className="item item-2 gridDc"></div>  
        <div className="item item-3">
            <h2>Editing {userData.username}'s profile</h2>
            <form onSubmit={handleSubmit}>
                <input className='formBox' required type="text" name="username" value={userData.username} onChange={handleChange} />
                <input className='formBox' required type="email" name="email" value={userData.email} onChange={handleChange} />
                <input className='formBox' type="file" onChange={(e) => handleFileUpload(e)} />
                <button className='genericButton genButtonRest' type="submit">Save changes and log out</button>
            </form>
        </div>
        <div className="item item-4 gridMarvel"></div>
    </div>
  )
}
