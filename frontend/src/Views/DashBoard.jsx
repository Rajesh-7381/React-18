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
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          // Check if the user clicked "Yes, delete it!"
          if (result.isConfirmed) {
            // If confirmed, delete the data
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            setData(prevData => prevData.filter(item => item.id !== id));
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  
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
                <Link className='nav-link'>a</Link>
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
                    <button className='btn btn-block bg-success '><Link><i  className='bi bi-pen'></i></Link></button>
                    <button className='btn btn-block bg-warning '><Link><i className='bi bi-eye'></i></Link></button>
                    <button onClick={()=>deletedata(row.id)} className='btn btn-block bg-danger '><Link><i className='bi bi-trash'></i></Link></button>
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
              {/* Add more sidebar links as needed */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;
