import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confrimpassword, setconfrimpassword] = useState('')

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

    if(HandleValidation()){
      const insert = {
        username: username,
        email: email,
        password: password,
        confrimpassword: confrimpassword
      }
  
      axios.post('http://localhost:8000/register', insert).then((data) => {
        console.log(data);
        if (data.data.status === 1) {
          toast.success(data.data.message, toastOptions);
          setTimeout(() => {
            navigate("/signin")
          }, 1500);
        } else {
          toast.error(data.data.error, toastOptions);
        }
      })
    }
  }


  const HandleValidation = (e) => {
    if(username === "" || email === ""){
      toast.error("Field is Required",toastOptions)
      return false
    }else if(password === "" || confrimpassword === ""){
      toast.error("Password is Required",toastOptions)
      return false
    }else if(password != confrimpassword){
      toast.error("Password Should be Same",toastOptions)
      return false
    }else if(password.length < 6 || confrimpassword.length < 6){
      toast.error("Password Should be 7 Character",toastOptions)
      return false
    }

    return true
  }



  return (
    <div>

      <div className='container'>

        <div className='row'>
          <div className='col s10 bg1 offset-s1'>
            <div className='card bg2 z-depth-4'>
              <form onSubmit={HandleSubmit}>
                <h4 className='center'>SignUp</h4>
                <div className='card-content'>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className='material-icons prefix'>account_circle</i>
                      <input id="username" type="text" className="validate" placeholder='UserName'  name='username' onChange={(e) => setusername(e.target.value)} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <i className='material-icons prefix'>email</i>
                      <input id="email" type="text" className="validate" placeholder='Email'  name='email' onChange={(e) => setemail(e.target.value)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className='material-icons prefix'>visibility</i>
                      <input id="password" type="password" className="validate" placeholder='Password'  name='password' onChange={(e) => setpassword(e.target.value)} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <i className='material-icons prefix'>visibility</i>
                      <input id="confpassword" type="password" className="validate" placeholder='ConfrimPassword'  name='confpassword'  onChange={(e) => setconfrimpassword(e.target.value)}/>
                    </div>
                  </div>

                  <div className='center'>
                    <span className='bg4 '>Already have a Account Please <a href='/signin'>Signin !!!</a></span>
                  </div>

                </div>
                <div className='card-action center'>
                  <button className='btn' type='submit'>SignUP</button>
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