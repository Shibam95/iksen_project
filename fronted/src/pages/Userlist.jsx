import React, { useState, useEffect } from 'react';
import axiosInstance from '../Api/apiurl';

export const Userlist = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const IMGURL = "http://localhost:2045/uploads/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/adminpanel');
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-cards">
          {users.data?.map((user) => (
            <div key={user.id} className="user-card">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  src={`${IMGURL}${user?.image}`} 
                  className="card-img-top"
                  alt={` ${user.name}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
