import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confrimpassword, setconfrimpassword] = useState('');
  const [isError, setisError] = useState('')

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
      username: username,
      email: email,
      password: password,
      confrimpassword: confrimpassword
    }

    axios.post('https://server-i.herokuapp.com/signup', insert).then((data) => {
      console.log(data);
      if (data.data.status === 1) {
        toast.success(data.data.message, toastOptions);
        setTimeout(() => {
          navigate("/signin")
        }, 2000);
      } else {
        toast.error(data.data.error, toastOptions);
      }
    })
  }

  const checkValidate = (e) => {
    const confPassword = e.target.value;
    setconfrimpassword(confPassword);
    if (password !== confPassword) {
      setisError("Password Must Same, Please Chect Passowrd!!!")
    } else {
      toast.success("password Same", toastOptions)
      setisError('')
    }
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
                      <i className='material-icons prefix'>account_circle</i>
                      <input id="username" type="text" className="validate" placeholder='UserName' required name='username' onChange={(e) => setusername(e.target.value)} />
                    </div>
                  </div>

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

                  <div className="row">
                    <div className="input-field col s12">
                      <i className='material-icons prefix'>visibility</i>
                      <input id="confpassword" type="password" className="validate" placeholder='ConfrimPassword' required name='confpassword' onChange={(e) => checkValidate(e)} />
                    </div>
                  </div>
                  <div className='center'>
                    <p className='style'>{isError}</p>
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

export default Signup