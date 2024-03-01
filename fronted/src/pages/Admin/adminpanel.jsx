import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './admin.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/AuthSlice';
import {Userlist} from '../Userlist'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Admin = () => {
  const dispatch=useDispatch()
  const role = localStorage.getItem('role');
  const navigate = useNavigate();



  

  const Logouthandle = () => {
    if(role==='admin'){
    dispatch(logout())
    toast.success('Admin logout successful');
    navigate('/login');
    }
  };

  

  return (
    <div>
      <div className="container-fluid">
        <div className="row content p-0">
          <div className="col-md-3 sidenav p-0">
            <div className="d-flex justify-content-between">
              {role==='admin'? (
                <p>
                  {' '}
                  <button className="btn cstm-btn">
                    <Link onClick={Logouthandle} className="text-white">
                      AdminLogout
                    </Link>
                  </button>
                </p>
              ) : (
                <p>
                  {' '}
                  <button className="btn cstm-btn">
                    <Link to="/login" className="text-white">
                      AdminLogin
                    </Link>
                  </button>
                </p>
              )}
            </div>
            <br />
            {role==='admin' ? (
              <>
                <div className="text-center">
                  <div className="admin-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
                      <path
                        fill="#fff"
                        d="M7.725 2.146c-1.016.756-1.289 1.953-1.239 2.59c.064.779.222 1.793.222 1.793s-.313.17-.313.854c.109 1.717.683.976.801 1.729c.284 1.814.933 1.491.933 2.481c0 1.649-.68 2.42-2.803 3.334C3.196 15.845 1 17 1 19v1h18v-1c0-2-2.197-3.155-4.328-4.072c-2.123-.914-2.801-1.684-2.801-3.334c0-.99.647-.667.932-2.481c.119-.753.692-.012.803-1.729c0-.684-.314-.854-.314-.854s.158-1.014.221-1.793c.065-.817-.398-2.561-2.3-3.096c-.333-.34-.558-.881.466-1.424c-2.24-.105-2.761 1.067-3.954 1.929z"
                      />
                    </svg>
                  </div>
              <h6 className="text-white mt-2">ADMIN PANEL</h6>
                  
                </div>
              </>
            ) : (
              <button
                className="btn btn-outline-success text-white"
                style={{ justifyContent: 'center', display: 'flex', margin: 'auto' }}
              >
                DashBoard
              </button>
            )}
            <br></br>
   
          <br />
          
          
          
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12 mt-4">
                <h4 style={{ background: 'lightgreen', width: '260px' }}>Userlist Details</h4>
                {role==='admin' ? <Userlist/> : ''}
                <br />

              
            
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>

  );
};
