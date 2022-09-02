import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const insert = {
      email: email,
      password: password,
    }

    axios.post('https://server-i.herokuapp.com/signin',insert).then((data) => {
      if (data.data.status === 1) {
        toast.success(data.data.message, toastOptions);
        window.localStorage.setItem("email",email)
        setTimeout(() => {
          navigate("/profile")
        }, 2000);
      } else {
        toast.error(data.data.error, toastOptions);
      }
    })

  }

  return (
    <div>
      <div className='container'>

        <div className='row'>
          <div className='col s10 offset-s1'>
            <div className='card'>
              <form onSubmit={HandleSubmit}>
                <h4 className='center'>SignUp</h4>
                <div className='card-content'>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className='material-icons prefix'>email</i>
                      <input id="email" type="text" className="validate" placeholder='Email' required name='email' onChange={(e) => setemail(e.target.value)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className='material-icons prefix'>visibility</i>
                      <input id="password" type="password" className="validate" placeholder='Password' required name='password' onChange={(e) => setpassword(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='card-action center'>
                  <button className='btn' type='submit'>Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signin