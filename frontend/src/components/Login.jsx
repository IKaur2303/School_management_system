import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login(props) {

  const [islogin,setislogin]= useState(false)
  const [user,setuser]= useState({})
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleChange=(e)=>{
    setuser({...user,[e.target.name]:e.target.value})
    console.log(user)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/login',user).then(data=>{
      console.log(data)
      if (data.status===200){
        props.setislogin(true)
        navigate('/adminpanel')
      }
      
    })
  }

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/islogin').then(data=>{
    if( data.status===200){
      setislogin(true)
      navigate('/adminpanel')
    }
    console.log(data)
    }).catch(data=>{
      console.log(data)
    })
  },[])
  return (
    // <div>
      <form className='login'>
        <h1>Admin-Login</h1>
       <div>
         <label htmlFor='username'>username</label>
         <input type= 'text' name='username' onChange={handleChange}/>
       </div>
       <div>
         <label htmlFor='password'>password</label>
         <input type= 'password' name='password' onChange={handleChange}/>
       </div>
       <div>
         <input type= 'submit' onClick={handleSubmit}/>
       </div>
      </form>
    // </div>
    
  )
}

export default Login