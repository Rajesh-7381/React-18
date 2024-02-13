import React, { useState } from "react";

function Register() {
  const [name,setName]=useState("");
  const handleSubmit=(e)=>{
    e.preventDefault();
    alert("enter");
  }
  return (
    <div>
      {/*fname,lanem,email,username ,password, confirm password,btn-register and login */}
      <div className="container">
        <h5 className="text-center">Registration Form</h5>

        <form action="" onSubmit={handleSubmit} >
          <div className="mb-3">
            <label for="fname" className="form-label"><i className="bi bi-person" />First Name<i style={{color:"red"}}>*</i></label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="enter your first name" className="form-control"
            />
          </div>

          <div className="mb-3 ">
            <label for="lname" className="form-label"> <i className="bi bi-person" />Last Name<i style={{color:"red"}}>*</i></label>
            <input
              type="text"
              name="fname"
              id="lname"
              placeholder="enter your last name" className="form-control"
            />
          </div>

          <div className="mb-3">
            <label for="email" className="form-label"><i className="bi bi-envelope" />Email <i style={{color:"red"}}>*</i></label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="enter your last name" className="form-control"
            />
          </div>

          <div className="mb-3">
            <label for="uname" className="form-label"><i className="bi bi-person" />User Name<i style={{color:"red"}}>*</i></label>
            <input
              type="text"
              name="uname"
              id="uname"
              placeholder="enter your user name" className="form-control"
            />
          </div>

          <div className="mb-3">
            <label for="password" className="form-label"><i className="bi bi-lock" />Password<i style={{color:"red"}}>*</i></label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter your password" className="form-control"
            />
          </div>

          <div className="mb-3">
            <label for="cpassword" className="form-label"><i className="bi bi-lock" />Confirm Password<i style={{color:"red"}}>*</i></label>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="enter your confirm  password" className="form-control"
            />
          </div>
          <div className="mb-3 ">
            <button type="submit" className="text-white bg-primary">Submit</button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Register;
