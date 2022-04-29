import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddAssignment() {
    const [data,setdata]= useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post('http://127.0.0.1:8000/addassignment',data).then(response=>{
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
    <form>
    <h1>Add Assignment</h1>
   <div>
     <label htmlFor='title'>Title</label>
     <input type= 'text' name='title' onChange={handleChange}/>
   </div>
   <div>
     <label htmlFor='description'>Description</label>
     <input type= 'text' name='description'onChange={handleChange}/>
   </div>
   <div>
     <label htmlFor='for_standard'>Standard</label>
     <select name='for_standard' id='for_standard' onChange={handleChange}>
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
     <label htmlFor='due_date'>Due Date</label>
     <input type= 'date' name='due_date'onChange={handleChange}/>
   </div>
   
   <div>
     <label htmlFor='subject'>Subject</label>
     <select name='subject'onChange={handleChange}>
       <option value='english'>English</option>
       <option value='hindi'>Hindi</option>
       <option value='mathematics'>Mathematics</option>
       <option value='science'>Science</option>
       <option value='history'>History</option>
       <option value='evs'>Evs</option>
       <option value='drawing'>Drawing</option>
       </select> 
   </div>
   <div>
     <input type= 'submit' onClick={handleSubmit}/>
   </div>
  </form>
  )
}

export default AddAssignment