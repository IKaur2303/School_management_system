import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
const [id,setid] = useState()
const navigate = useNavigate()


  const handleChange=(e)=>{
    setid(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    navigate(`/studentpanel/${id}`)
  }
  return (
    // <div>
        <form className='login'>
       <div>
         <label htmlFor='reg_no'>Enter your Registration Number</label>
         <input type= 'text' name='reg_no' onChange={handleChange}/>
       </div>
       <div>
         <input type= 'submit' onClick={handleSubmit}/>
       </div>
      </form>
    // </div>
  )
}

export default Home