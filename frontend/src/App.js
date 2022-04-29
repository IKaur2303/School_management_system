import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import AddAssignment from './components/AddAssignment';
import Home from './components/Home';
import StudentPanel from './components/StudentPanel';
import AdminPanel from './components/AdminPanel';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const[islogin,setislogin]= useState(false)
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const logout=()=>{
    axios.get('http://127.0.0.1:8000/signout').then(response=>{
      console.log(response)
      setislogin(false)
      navigate('/login')
    })
  }
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/islogin').then(data => {
        console.log(data)
        setislogin(true)
    }).catch(data=>{
      console.log(data)
      setislogin(false)
    })
}, [])
  return (
    <>
      <nav>
        <div className='logo'>Logo</div>
        <ul>
          {!islogin && <Link to = "/"> <li>Home</li></Link>}
          {islogin && <>
          <Link to= '/'><li>Student Dashboard</li></Link>
          <Link to = 'adminpanel'><li>Admin Dashboard</li></Link>
          <Link to= "addstudent"><li>Add Student</li></Link>
          <Link to="addassignment"><li>Add Assignment</li></Link>
          <li onClick={logout}>Logout</li>
          </>}
          {!islogin && <Link to="login"><li className='admin'>Login as Admin</li></Link>}
        </ul>
      </nav>

      <Routes>
      <Route exact path = 'login'  element = {<Login setislogin={setislogin}/>}  />
      <Route exact path = '/' element = {<Home/>}  />
      <Route exact path = 'addstudent' element = {<AddStudent/>}  />
      <Route exact path = 'updatestudent/:id' element = {<UpdateStudent/>}  />
      <Route exact path = 'studentpanel/:id' element = {<StudentPanel/>}  />
      <Route exact path = 'adminpanel' element = {<AdminPanel/>}  />
      <Route exact path = 'addassignment' element = {<AddAssignment/>}  />
      </Routes>

      
      </>
  );
}

export default App;
