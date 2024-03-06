import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DashBoard = () => {
  useEffect(() => {
    document.title = "DashBoard";
  }, []);

  const [Data, setData] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8081/userdata')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  // Inside the component
  const deletedata = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/deletedata/${id}`);
      if (response.status === 200) {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });
  
        // Check if the user clicked "Yes, delete it!"
        if (result.isConfirmed) {
          // If confirmed, delete the data
          await axios.delete(`http://localhost:8081/deletedata/${id}`);
          setData(prevData => prevData.filter(item => item.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the data.",
        icon: "error"
      });
    }
  }
  
  const [userData, setUserData] = useState(null);  
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/induserdata/${id}`);
      if (response.status === 201) {
        setUserData(response.data[0]);
      } else {
        console.log('Failed to fetch user data');
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  };
  
  return (
    <div className="container-fluid">
    <div className=''>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
          <Link className='navbar-brand'>h</Link>
          <div className='collapse navbar-collapse' id='navbartext'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <Link className='nav-link'>a</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link'><Link to="/login">Login</Link></Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link'></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <br />
      <div className="row">
        {/* Main Content */}
        <div className="col-md-9">
          <h4 style={{ textAlign: "center" }}>Table Data</h4>
          <table className='table table-dark table-striped'>
            <thead>
              <tr>
                <th style={{ color: "gray" }}>ID</th>
                <th style={{ color: "gray" }}>FNAME</th>
                <th style={{ color: "gray" }}>LNAME</th>
                <th style={{ color: "gray" }}>UNAME</th>
                <th style={{ color: "gray" }}>EMAIL</th>
                <th style={{ color: "gray" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.fname}</td>
                  <td>{row.lname}</td>
                  <td>{row.uname}</td>
                  <td>{row.email}</td>
                  <td>
                    <button onClick={()=>editform(row.id)} className='btn btn-block bg-success '><Link to="/update"><i  className='bi bi-pen '></i></Link></button>
                    <button onClick={() => fetchUserData(row.id)} className='btn btn-block bg-success'><i className='bi bi-eye'></i></button>
                    <button onClick={()=>deletedata(row.id)} className='btn btn-block bg-danger'><Link><i className='bi bi-trash'></i></Link></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="sticky-top" style={{ top: '60px' }}>
            <h4>Sidebar</h4>
            <ul className="list-group">
              <li className="list-group-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="list-group-item"><Link to="/profile">Profile</Link></li>
              <li className="list-group-item"><Link to="/todo">Todo</Link></li>
              {/* Add more sidebar links as needed */}
            </ul>
          </div>
        </div>
      </div>
      {userData && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="close" style={{color:"white",backgroundColor:"red"}} data-dismiss="modal" aria-label="Close" onClick={() => setUserData(null)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Display user data here */}
                <p>ID: {userData.id}</p>
                <p>First Name: {userData.fname}</p>
                <p>Last Name: {userData.lname}</p>
                <p>User Name: {userData.uname}</p>
                <p>Email : {userData.email}</p>
              
                {/* Add other user data as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default DashBoard;
