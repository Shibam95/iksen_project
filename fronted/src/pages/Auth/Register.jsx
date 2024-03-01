import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/slice/AuthSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navber'
const initialValue = {
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: ''
}

export const Register = () => {
    const  {redirectReg,loading}  = useSelector((state) => state?.auth);
    const [user, setUser] = useState(initialValue);
    const [img,setImg]= useState("")
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const validation = () => {
        let error = {}
        
        if (!user.name) {
            error.name = "Name is Required"
        }

        if (!user.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
        ) {
            error.email = "Enter a valid Email"
        }
        if (!user.password) {
            error.password = "Password is Required"
        }
        if (!user.confirmPassword) {
            error.confirmPassword = "ConfirmPassword is Required"
        }

        return error
    }

    let name, value, file
    const postUserData = (e) => {
        name = e.target.name
        value = e.target.value
        file = e.target.file
        setUser({ ...user, [name]: value, [name]: file })
        


        if (name === "name") {
            if (value.length === 0) {
                setError({ ...error, name: "@Name is Required" })
                setUser({ ...user, name: "" })
            } else {
                setError({ ...error, name: "" })
                setUser({ ...user, name: value })
            }
        }
        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "Email is required" })
                setUser({ ...user, email: "" })
            } else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
            }
        }
       
        if (name === "password") {
            if (value.length === 0) {
                setError({ ...error, password: "@password is Required" })
                setUser({ ...user, password: "" })
            } else {
                setError({ ...error, password: "" })
                setUser({ ...user, password: value })
            }
        }
        if (name === "confirmPassword") {
            if (value.length === 0) {
                setError({ ...error, confirmPassword: "@password is Required" })
                setUser({ ...user, confirmPassword: "" })
            } else {
                setError({ ...error, confirmPassword: "" })
                setUser({ ...user, confirmPassword: value })
            }
        }
    }
 
    const SubmitInfo = async (e) => {
        e.preventDefault()
        let ErrorList = validation()
        setError(validation())
        let formData = new FormData();
        if (Object.keys(ErrorList).length === 0) {
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("confirmPassword", user.confirmPassword);
            formData.append("image", img);
            try {
                await dispatch(registerUser(formData));
                navigate("/login")
                
          
                
                // if (redirectReg) {
                //  const ress= await axiosInstance.post('/send-registration-email', {
                //     email: user.email,
                //   });
                // //   console.log(ress?.data?.message)
                //  toast(ress?.data?.message)
                //  navigate("/login")
                  
                // }
              } catch (error) {
                console.error('Registration error:', error);
              }
             
        }
        
    }
    const redirectUser = () => {
        let name = localStorage.getItem("name")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/register";
        if (name !== null && name !== undefined && name !== "") {
            isInLoginPage && navigate("/login");
        }
    }
    useEffect(() => {
        redirectUser()
    }, [redirectReg])
  return (
    <>
    <Navbar/>
    <div className='background1'></div>
    <div className='container1'>
    <div className='item1'>
    <h1 style={{color:"white"}}>Golden Wings</h1>
    <div className='text-item'>
    <h2 style={{color:"white"}}>Welcome!<br/><span>To Sign up Page</span></h2>
    <p>Love your morning cup of joe even more by discovering what goes into a satisfying brew on a coffee tour. You’ll
     learn about every stage of the production process, from growing to roasting</p>
    <div className='social-icon'>
    <a class="text-white px-3" href="">
    <i class="fab fa-facebook-f"></i>
</a>
<a class="text-white px-3" href="">
    <i class="fab fa-twitter"></i>
</a>
<a class="text-white px-3" href="">
    <i class="fab fa-linkedin-in"></i>
</a>
<a class="text-white px-3" href="">
    <i class="fab fa-instagram"></i>
</a>
<a class="text-white pl-3" href="">
    <i class="fab fa-youtube"></i>
</a>
    </div>
    </div>
    </div>
<div className='login-section'>
<div className='form-box1 login'>
<form action=''>
<h2 style={{color:"white"}}>Sign up</h2>
<div className='input-box1'>
<span className='icon'><i class="fa-solid fa-file-signature"></i></span>
<input type='name'value={user.name} name='name'  onChange={e=>postUserData(e)}/>
<label >Name</label>
<span style={{ color: "red" }}> {error.name} </span>
</div>
<div className='input-box1'>
<span className='icon'><i className="fa-regular fa-envelope"></i></span>
<input type='email'value={user.email} name='email'  onChange={e=>postUserData(e)}/>
<label >Email</label>
<span style={{ color: "red" }}> {error.email} </span>
</div>
<label>Image<span style={{color:"red"}}>*</span></label>
        <input
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                    name="img"
                    accept="image/*"
                    class="form-control"
                  />

<div className='input-box1'>
<span className='icon'><i class="fa-regular fa-lock"></i></span>
<input type='password'value={user.password} name='password'  onChange={e=>postUserData(e)}/>
<label >Password</label>
<span style={{ color: "red" }}> {error.password} </span>
</div>
<div className='input-box1'>
<span className='icon'><i class="fa-regular fa-lock"></i></span>
<input type='password'value={user.confirmPassword} name='confirmPassword'  onChange={e=>postUserData(e)}/>
<label >ConfirmPassword</label>
<span style={{ color: "red" }}> {error.confirmPassword} </span>
</div>
<div className='remember-password'>
<label><input type='checkbox'/>Remember Me</label>
</div>
<button onClick={SubmitInfo} className='btn1'>Sign up</button>
<div className='create-account'>

<p>Allready Have An Account?<Link  to={'/login'}>Sign in</Link></p>
</div>
</form>
</div>
</div>


    </div>







    
    </>
  )
}
