import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

function AdminPanel() {
  const [students, setstudents] = useState([])
  const [assignments, setassignments] = useState([])
  const [countstudent, setcountstudent] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/islogin').catch(data=>{
      console.log(data)
      navigate('/login')
    })
}, [])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getstudent').then(data => {
      console.log(data)
      setstudents(data.data.data)
    })
    axios.get('http://127.0.0.1:8000/getassignment').then(data => {
      console.log(data)
      setassignments(data.data.data)
    })
  }, [])

  useEffect(() => {
    const obj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
    students.map((ele) => {
      obj[ele.standard] = obj[ele.standard] + 1
    })
    setcountstudent(obj)
  }, [students])

  return (
    <div className="adminpanel">
      <div className="students">
        <div className="heading">Students-Information</div>
        <div className="studentheading">
          <span className='totalstudents'>
            Total Students : {students.length}
          </span>                             
          {Object.keys(countstudent).map((ele) => {
          const e =  countstudent[ele]?<span className='studentin'>Students in Standard {ele} : {countstudent[ele]}</span>:''
          return e
})}
        </div>
        {students.map((ele) => (
          <div className="student" onClick={()=>navigate(`/updatestudent/${ele.reg_no}`)}>
            <div className="reg">{ele.reg_no}</div>
            <div className="name">{ele.firstname} {ele.lastname}</div>
            <div className="standard">{ele.standard}</div>
            <div className="guardiancontact">{ele.guardian_contact}</div>
          </div>
        ))}
      </div>
      <div className="assignments">
        <div className="heading">Assignments</div>
        {assignments.map((ele) => (
          <div className="assignment">
            <div className="title">{ele.title}</div>
            <div className="for_standard">{ele.for_standard}</div>
            <div className="description">{ele.description}</div>
            <div className="issue">{ele.issue_date}</div>
            <div className="due">{ele.due_date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel
