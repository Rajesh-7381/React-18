import React, { useState } from "react";
import {useFormik} from "formik";
import { signupSchema } from "../Schema";
import { Link } from "react-router-dom";

function Register() {
  const [pass,setpass]=useState(false);
  const [pass2,setpass2]=useState(false);
  const initialValues={
    fname:"",
    lname:"",
    email:"",
    uname:"",
    password:"",
    cpassword:""
  };
  // const Register=()=>{
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
      initialValues:initialValues,
      validationSchema:signupSchema,
      onSubmit:(values,action)=>{
        console.log(values)
        action.resetForm()
      }
    })
  // }
  return (
    <div className="col-sm-5 container-fluid mt-4">
      {/*fname,lanem,email,username ,password, confirm password,btn-register and login */}
      <div className="container">
        <h5 className="text-center">Registration Form</h5>

        <form action=""  onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fname" className="form-label"><i className="bi bi-person" />First Name<span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              name="fname"
              id="fname"
              autoComplete="username"
              placeholder="enter your first name" className="form-control"
              
              value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fname && touched.fname ? <p className="form-error text-danger">{errors.fname}</p> : null}
          </div>

          <div className="mb-3 ">
            <label htmlFor="lname" className="form-label"> <i className="bi bi-person" />Last Name<span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="enter your last name" className="form-control"
              autoComplete="username"
              value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lname && touched.lname ? <p className="form-error text-danger">{errors.lname}</p> : null}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-secondary"><i className="bi bi-envelope" />Email<span style={{color:"red"}}>*</span></label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter your last name" className="form-control"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? <p className="form-error text-danger">{errors.email}</p> : null}

          </div>

          <div className="mb-3">
            <label htmlFor="uname" className="form-label"><i className="bi bi-person" />User Name<span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              name="uname"
              id="uname"
              placeholder="enter your user name" className="form-control"
              autoComplete="username"
              value={values.uname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.uname && touched.uname ? <p className="form-error text-danger">{errors.uname}</p> : null}

          </div>

          <div className="mb-3 col-md-11 ">
            <label htmlFor="password" className="form-label"><i className="bi bi-lock" />Password<span style={{color:"red"}}>*</span></label>
            <input
              type={pass ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="enter your password" className="form-control"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? <p className="form-error text-danger">{errors.password}</p> : null}
            <p className="btn btn-outline-secondary" onClick={()=>setpass(!pass)}>{(pass) ? <i className="bi bi-eye-slash"></i>  : <i className="bi bi-eye"></i>}</p>

          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label"><i className="bi bi-lock" />Confirm Password<span style={{color:"red"}}>*</span></label>
            <input
              type={pass2 ? 'text' : 'password'}
              name="cpassword"
              id="cpassword"
              placeholder="enter your confirm  password" className="form-control"
              autoComplete="new-password"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cpassword && touched.cpassword ? <p className="form-error text-danger">{errors.cpassword}</p> : null}
            <p className="btn btn-outline-secondary" onClick={()=>setpass2(!pass2)}>{(pass2) ? <i className="bi bi-eye-slash"></i>  : <i className="bi bi-eye"></i>}</p>


          </div>  
          <div className="mb-3 ">
            <button type="submit" className="text-white bg-primary">Submit</button>
            <p>Have an ACcount ? <Link to="/login">Login</Link></p>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Register;
