import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function StudentPanel() {
    const [assignments, setassignments] = useState([])
    const [student,setstudent] = useState({})
    const [allassignments,setallassignments] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()
    axios.defaults.withCredentials = true
    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/islogin').catch(data => {
    //         console.log(data)
    //         navigate('/login')
    //     })
    // }, [])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/getassignment`).then(response=> {
            // console.log(response)
            setallassignments(response.data.data)
        })
    }, [])

    

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/getstudent/${id}`).then(response=> {
            // console.log(response)
            setstudent(response.data)
        })
    }, [])

    useEffect(() => {
        // console.log(allassignments,student)
        setassignments(allassignments.filter((ele)=>(ele.for_standard===student.standard)))
       
    },[student,allassignments])
    return (
        <>
            <div className="profile">
                <div className="heading">Profile</div>
                <div className="name">Name : {student.firstname} {student.lastname}</div>
                <div className="reg_no">Reg No. : {student.reg_no}</div>
                <div className="standard">Standard : {student.standard}</div>
            </div>
            <div className="assignments">
                {
                    assignments.map((ele) => (
                        <div className="assignment">
                            <div className="subject">Subject: {ele.subject}</div>
                            <div className="title">Title: {ele.title}</div>
                            <div className="description">Description: {ele.description}</div>
                            <div className="issue">Issued on: {ele.issue_date.slice(0,10)}</div>
                            <div className="due">Due Date: {ele.due_date.slice(0,10)}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default StudentPanel
