import { configureStore } from "@reduxjs/toolkit";
import  AuthReducer  from "../slice/AuthSlice";
import AdminReducer from "../slice/AuthSlice";

export const store = configureStore({
    reducer: {
        auth:AuthReducer,
        admin:AdminReducer,
        
    }
}
)