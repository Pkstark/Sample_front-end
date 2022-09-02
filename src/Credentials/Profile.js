import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const [UserData, setUserData] = useState('')

  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    getData();
  }, [])


  const getData = () => {
    const insert = {
      email: email
    }
    axios.post("https://server-i.herokuapp.com/getdata", insert).then((data) => {
      console.log(data);
      setUserData(data.data.result)
    })
  }

  const Trigger = (e) => {
    var elems = document.querySelectorAll('.modal');
    var trig = M.Modal.init(elems, {});
  }

  const Handlechange = (e) => {
    const id = e.target.id
    const value = e.target.value

    setUserData((prevState) => ({
        ...prevState,
        [id]: value
    }))
  }

  const HandleUpdate = (e) => {
    e.preventDefault();

    const pk = {
      username : UserData.username,
      email : UserData.email,
      age : UserData.age,
      dob : UserData.dob,
      gender : UserData.gender,
      phoneno : UserData.phoneno
    }

    axios.post(`https://server-i.herokuapp.com/userupdate/${UserData._id}`,pk).then((data) => {
      console.log(data);
      if(data.data.status === 1){
        toast.success(data.data.message,toastOptions)
      }else{
        toast.error(data.data.message,toastOptions)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const posted = (e) => {
    e.preventDefault();
    navigate("/signin")
  }

  return (
    <div>


      <nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo" >Profile</a>
          <ul className="right">
            <li><a href="" onClick={posted}>Logout</a></li>
          </ul>
        </div>
      </nav>


      <div className='container'>
        <h5 className='center'>Welcome &nbsp;{UserData.username}</h5>
        <div className='row'>
          <div className='card '>
            <div className='card-content'>
              <div className='row'>
                <div className='col s6'>
                  <p>UserName : {UserData.username}</p>
                </div>
                <div className='col s6'>
                  <p>Email : {UserData.email}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col s6'>
                  {UserData.age === "" ? (<div></div>) : (<div>
                    <p>Age : &nbsp; {UserData.age}</p>
                  </div>)}
                </div>
                <div className='col s6'>
                  {UserData.gender === "" ? (<div></div>) : (<div>
                    <p>Gender : &nbsp; {UserData.gender}</p>
                  </div>)}
                </div>
              </div>
              <div className='row'>
                <div className='col s6'>
                  {UserData.dob === "" ? (<div></div>) : (<div>
                    <p>DOB : &nbsp; {UserData.dob}</p>
                  </div>)}
                </div>
                <div className='col s6'>
                  {UserData.phoneno === "" ? (<div></div>) : (<div>
                    <p>Mobile : &nbsp; {UserData.phoneno}</p>
                  </div>)}
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                  <button className='btn right blue modal-trigger' data-target="change" onClick={Trigger}>UpdateProfile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="change" className="modal">
        <h5 className='center'>Update Profile</h5>
        <form encType="multipart/form-data">
          <div className="modal-content">
            <div className='row '>
              <div className='input-field col s6 '>
                <input type="text" className="validate" id='username' value={UserData.username} name='username' onChange={(e) => Handlechange(e)} required />
              </div>

              <div className='input-field col s6 '>
                <input type="text" className="validate" id='email' value={UserData.email} name='email' onChange={(e) => Handlechange(e)} required />
              </div>
            </div>
            <div className='row '>
              <div className='input-field col s6 '>
                <input type="text" className="validate" id='age' placeholder='age' value={UserData.age} name='age' onChange={(e) => Handlechange(e)} required />
              </div>

              <div className='input-field col s6 '>
                <select id='gender' className="browser-default" value={UserData.gender} name='gender' onChange={(e) => Handlechange(e)} required>
                  <option>Gender</option>
                  <option >Male</option>
                  <option >Female</option>
                </select>
              </div>
            </div>

            <div className='row '>
              <div className='input-field col s6 '>
                <input type="date" placeholder='Date of Birth' className='browser-default style1' id = "dob" name='dob' value={UserData.dob} onChange={(e) => Handlechange(e)}/>
              </div>

              <div className='input-field col s6 '>
                <input type="text" className="validate" id='phoneno'  placeholder='Phone Number' value={UserData.phoneno} onChange={(e) => Handlechange(e)} name='phoneno' required />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className='btn indigo modal-close' onClick={HandleUpdate}>Update</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile