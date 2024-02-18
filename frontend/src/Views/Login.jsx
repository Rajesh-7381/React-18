import React from 'react';

const Login = () => {
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center'>
      <div className='col-sm-6'>
        <h4 className='text-center mb-4'>Login Form</h4>
        <form>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email:</label>
            <input type='text' name='email' id='email' className='form-control' />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password:</label>
            <input type='password' name='password' id='password' className='form-control' />
          </div>
          <div className='d-gri gap-2'>
            <button type='submit' className='btn btn-primary'>Login</button>
          </div>
          <div className='text-center my-3'>
            <span>OR</span>
          </div>
          <div className='d-grid gap-2'>
            <button type='button' className='btn btn-danger'>
              <i className='bi bi-google'></i> Login using Google
            </button>
          </div>
          <div className='d-grid gap-2'>
            <button type='button' className='btn btn-primary'>
              <i className='bi bi-facebook'></i> Login using Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
