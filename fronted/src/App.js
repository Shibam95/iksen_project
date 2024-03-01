import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check_token } from './redux/slice/AuthSlice';
import { Home } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Admin } from './pages/Admin/adminpanel';
import UserProfile from './pages/Userprofile';



function App() {
  const dispatch = useDispatch();
  //check token avable or not
  function PrivateRoute({ children }) {
    const token =localStorage.getItem("token")
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  //for Public Route
  const PublicRouteNames = [
    {
      path: "/login",
      Component: <Login/>
    },
    
    {

      path: "/register",
      Component: <Register/>
      
    },
    {
      path: '/',
      Component: <Home/>
    },
    {
      path: '/adminpanel',
      Component: <Admin/>
    },


    


  ]
//for Private Route
  const PrivateRouteNames = [

    {
      path: '/userprofile',
      Component: <UserProfile/>
    },


    
  
  ]
  
  useEffect(() => {
   dispatch(check_token())
  }, [])
  
  return (
    <>
        <Router>
          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route
                  Key={index + 1}
                  exact
                  path={route.path}
                  element={route?.Component}
                />
              )
            })}

            {/* Protect Route */}
            {PrivateRouteNames?.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route?.Component}</PrivateRoute>}
                />
              )

            })}
            
            
          </Routes>
        
        </Router>
                    
    </>
  );
}

export default App;
