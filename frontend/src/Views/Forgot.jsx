import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Forgot = () => {
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    useEffect(()=>{
        document.title="Forgot Password"
    },[])

    const handlesubmit=async(e)=>{
        e.preventdefault();
        try {
            const response=await axios.get(`http://localhost:8081/check-email/${email}`);
            if(response.status===200){

            }
        } catch (error) {
            console.error("error checking email!")
            alert("please try again later!")
        }
    }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body" >
              <h4 className="card-title text-center" >Forgot Password</h4>
              <form onSubmit={handlesubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}   style={{backgroundColor:"gray"}}/>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
