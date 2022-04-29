import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddStudent() {

  const [data,setdata]= useState()
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/addstudent',data).then(response=>{
      console.log(response)

    })
  }

  const handleChange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})

  }

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/islogin').catch(data=>{
      console.log(data)
      navigate('/login')
    })
  },[])
  return (
    // <div>
      <form>
        <h1>Add Student</h1>
       <div>
         <label htmlFor='firstname'>First name</label>
         <input type= 'text' name='firstname' onChange={handleChange}/>
       </div>
       <div>
         <label htmlFor='lastname'>Last name</label>
         <input type= 'text' name='lastname' onChange={handleChange}/>
       </div>
       <div>
         <label htmlFor='dob'>DOB</label>
         <input type= 'date' name='dob' onChange={handleChange}/>
       </div>
       <div>
         <label htmlFor='father_name'>Father's Name</label>
         <input type= 'text' name='father_name' onChange={handleChange}/>
       </div>
       <div>
         <label htmlFor='mother_name'>Mother's Name</label>
         <input type= 'text' name='mother_name' onChange={handleChange}/>
       </div>
       
       <div>
         <label htmlFor='guardian_contact'>Guardian's Contact</label>
         <input type= 'text' name='guardian_contact' onChange={handleChange}/>
       </div>
       <div>
         <label htmlFor='standard'>Standard</label>
         <select name='standard' onChange={handleChange}>
           <option value='1'>First</option>
           <option value='2'>Second</option>
           <option value='3'>Third</option>
           <option value='4'>Fourth</option>
           <option value='5'>Fifth</option>
           <option value='6'>Sixth</option>
           <option value='7'>Seventh</option>
           <option value='8'>Eighth</option>
           </select> 
       </div>
       <div>
         <input type= 'submit' onClick={handleSubmit}/>
       </div>
      </form>
    // </div>
  )
}

export default AddStudent