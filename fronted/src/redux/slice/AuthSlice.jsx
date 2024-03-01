import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from '../../Api/apiurl';

const initialState = {
  loading: false,
  user: {}, // for user object
  redirectTo: null,
  Logouttoggle: false,
  userName: false,
  redirectReg: null
}

export const registerUser = createAsyncThunk("signup", async (formdata) => {
  try {
    const ress = await axiosInstance.post("/registration", formdata);
    return ress?.data
  } catch (error) {
    throw new error("error")
  }
});

export const loginRequest = createAsyncThunk("login", async (user) => {
  try {
    const res = await axiosInstance.post("/signin", user);
    return res?.data;
  } catch (error) {
   throw error
  }
});



export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    //check for auth token 
    check_token: (state, { payload }) => {
      let token = localStorage.getItem("token");
      if (token !== null && token !== undefined) {
        state.Logouttoggle = true;
        state.Logoutadmin = true
      }
    },

    logout: (state, { payload }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("name1");
      localStorage.removeItem("email1");
      localStorage.removeItem("role");
      state.Logouttoggle = false

    },

    
    RegLog: (state, { payload }) => {
      localStorage.removeItem("name1");
      state.Logouttoggle = false
      state.redirectTo = null
    },

    redirectToo: (state, { payload }) => {
      state.redirectTo = payload
    },

    redirectTo_Register: (state, { payload }) => {
      state.redirectReg = payload
    }


  },

  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      if (payload?.status === true) {
        localStorage.setItem("name1", payload?.data.name);
        localStorage.setItem("email1", payload?.data.email);
        localStorage.setItem("image1", payload?.data.image);
        state.redirectReg = "/login";
        state.loading = false;
        toast(`hi ${payload?.data?.name} Register successfully done`);
      } 
          // console.log(payload)
        if (payload?.status === false ) {
          state.redirectReg = "/register";
          toast(payload?.message);
        } 
      
    },
    
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      toast("User Exit Allready")
    },

    //login
    [loginRequest.pending]: (state, action) => {
      state.loading = true;
    },
    [loginRequest.fulfilled]: (state, { payload }) => {

      if (payload?.status === true) {
        localStorage.setItem("token", payload?.token);
        localStorage.setItem("role", payload?.role);
        state.Logouttoggle = true
        toast(payload?.message)
      }else{
        if(payload?.status === 400){
          toast(payload?.message)
         }
     
      }

    },
    [loginRequest.rejected]: (state, action) => {
      state.loading = false;
      toast("Invalid data")

    },

    
  },
})

export const {
  check_token, redirectToo, logout, redirectTo_Register,RegLog } = AuthSlice.actions

export default AuthSlice.reducer