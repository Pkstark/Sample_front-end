import React, { useEffect, useState } from 'react'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';
import {ToastContainer, toast} from 'react-toastify'

function Profile() {
  const [UserData, setUserData] = useState('');
  const [Apply, setApply] = useState('')

  const email = localStorage.getItem("email");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  }

  const GetData = () => {
    const insert = {
      email: email
    }

    axios.post("http://localhost:8000/getleave", insert).then((data) => {
      console.log(data)
      setUserData(data.data.result)
    })
  }

  useEffect(() => {
    GetData();
  }, [])

  const Trigger = () => {
    var elems = document.querySelectorAll('.modal');
    var trigg = M.Modal.init(elems, {})
  }

  const HandleChange =(e) => {
    const name = e.target.name;
    setApply({...Apply,[name] : e.target.value})
  }

  const HandleSubmit =(e)  => {
    e.preventDefault();

    const date1 = new Date(Apply.start)
    const date2 = new Date(Apply.end)

    const Different = date2.getTime() - date1.getTime()
    const Days = Different/(1000 * 60 * 60 *24)

    if(Apply.name === "sickleave"){
      const dd = UserData.sickleave + Days
      const tt = UserData.balanceleave - Days
      const kk = (UserData.sickleave + UserData.casualleave) + dd
      console.log(kk)
      const insert = {
        sickleave : dd,
        balanceleave : tt,
        appiledleave : kk
      }
      axios.post(`http://localhost:8000/leave/${UserData._id}`,insert).then((data) => {
        console.log(data)
        if(data.data.status === 1){
          toast.success(data.data.message,toastOptions)
          GetData();
        }else if(data.data.status === 0){
          toast.error(data.data.error,toastOptions)
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    if(Apply.name === "casualleave"){
      const dd = UserData.casualleave+ Days
      const tt = UserData.balanceleave - Days
      const kk = (UserData.sickleave + UserData.casualleave) + dd
      console.log(kk)
      const insert = {
        casualleave : dd,
        balanceleave : tt,
        appiledleave : kk
      }

      axios.post(`http://localhost:8000/leave/${UserData._id}`,insert).then((data) => {
        console.log(data)
        if(data.data.status === 1){
          toast.success(data.data.message,toastOptions);
          GetData();
        }else if( data.data.status === 0){
          toast.error(data.data.error,toastOptions);
          GetData();
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    if(Apply.name === "earnleave"){

      const dd = UserData.earnleave + Days
      const tt = UserData.balanceleave - Days
      const kk = (UserData.sickleave + UserData.casualleave) + dd
      console.log(kk)

      const insert = {
        earnleave : dd,
        balanceleave : tt,
        appiledleave : kk
      }

      axios.post(`http://localhost:8000/leave/${UserData._id}`,insert).then((data) => {
        console.log(data)
        if(data.data.status === 1){
          toast.success(data.data.message,toastOptions);
          GetData();
        }else if( data.data.status === 0){
          toast.error(data.data.error,toastOptions);
          GetData();
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    document.getElementById('start').value = null;
    document.getElementById('end').value = null;
    document.getElementById('message').value = null;

  }


  return (
    <div>
      
      <nav className="nav-wraper indigo accent-1">
        <div className="container">
          <div>
            <a className="brand-logo left">LOGO</a>
            <a className='btn bg13 right' href='/signin'>Logout</a>
          </div>
        </div>
      </nav>

      <div className='container'>
        <div className='row'>
          <div className='col s6 left bg7'>
            <h5>Leave Data : </h5>
          </div>
          <div className='col s6'>
            <button className='btn right bg6 modal-trigger' data-target="change" onClick={(e) => Trigger(e)} disabled = {UserData.balanceleave === 0}>Applyleave</button>
          </div>
        </div>
        
        <div className='card bg5'>
          <div className='card-content'>
            {UserData.balanceleave === 0 ? (<div className='center'><span className='bg12' style={{color : "red"}}>You Already Reached Limit You Can't Apply Leave</span></div>) : (<div></div>)}<br/>
            <h5 className='center'>{UserData.username} Leave Details</h5><br />
            <table>
              <thead>
                <tr>
                  <th className='center'>UserName</th>
                  <th className='center'>Sick Leave</th>
                  <th className='center'>Casual Leave</th>
                  <th className='center'>Paid Leave</th>
                  <th className='center'>Total Number Leave</th>
                  <th className='center'>No of Applied Leave</th>
                  <th className='center'>Balance Leave</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='center'>{UserData.username}</td>
                  <td className='center'>{UserData.sickleave}</td>
                  <td className='center'>{UserData.casualleave}</td>
                  <td className='center'>{UserData.earnleave}</td>
                  <td className='center'>{UserData.totalnumberleaves}</td>
                  <td className='center'>{UserData.appiledleave}</td>
                  <td className='center'>{UserData.balanceleave}</td>
                  
                </tr>
              </tbody>
            </table><br/>
          </div>
        </div>
      </div>

      <div id="change" className="modal z-depth-4 bg15">
        <form>
          <div className="modal-content">
            <h5 className='center'>Apply Leave</h5>

            <div className='row'>
              <div className='col s12'>
                <span>Catagroy : </span><br/><br/>
                <select className='browser-default bg8' name= "name" onChange={(e) => HandleChange(e)}>
                  <option value={"earnleave"}>Earn Leave</option>
                  <option value={"casualleave"}>Casual Leave</option>
                  <option value={"sickleave"}>Sick Leave</option>
                </select>
              </div>
            </div><br/>
            <div className='row'>
              <div className='col s6'>
                <span>Start Date : </span><br/>
                <input id='start' type="date" className='bg9' name='start' onChange={(e) => HandleChange (e)}/>
              </div>
              <div className='col s6'>
                <span>End Date : </span><br/>
                <input id='end' type="date" className='bg9' name='end' onChange={(e) => HandleChange (e)}/>
              </div>
            </div>
            <div className='row'>
              <div className='col s12'>
                <span>Message : </span><br/>
                <textarea id='message' name='message' className='bg10'/>
              </div>
            </div>
          </div>
          <div className="modal-footer bg16">
          <button type='submit' className='btn mod modal-close bg11'>Cancel</button>&nbsp;&nbsp;
            <button type='submit' className='btn mod modal-close bg11' onClick={HandleSubmit}>Apply</button>
          </div>
        </form>
      </div>

      <ToastContainer/>

      </div>

  )
}

export default Profile