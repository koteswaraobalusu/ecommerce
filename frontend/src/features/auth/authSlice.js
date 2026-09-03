import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authService";


const storedAccessToken=localStorage.getItem('accessToken')
const storedRefreshToken=localStorage.getItem('refreshToken')

const initialState={
    user:null,
    accessToken:storedAccessToken,
    refreshToken:storedRefreshToken,
    isAuthenticated:Boolean(storedAccessToken),
    loading:false,
    error:null
}

export const registerUser=createAsyncThunk('auth/register',async(userData,thunkAPI)=>{
    try{
        return await authService.register(userData)
    }
    catch(error){
        return thunkAPI.rejectWithValue(
            error.response?.data || "Registration failed"
        )
    }
})

export const loginUser=createAsyncThunk('auth/login',async(credentials,thunkAPI)=>{
    try{
        const data=await authService.login(credentials)

        localStorage.setItem( "accessToken", data.access);

      localStorage.setItem("refreshToken",data.refresh);

      return data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(
            error.response?.data || "Login failed"
        )
    }
})

export const fetchProfile=createAsyncThunk('auth/profile',async(_,thunkAPI)=>{
    try{
       
        return await authService.getProfile();

    }
    catch(error){
        return thunkAPI.rejectWithValue(
            error.response?.data || "Unable to fetch profile"
        )
    }
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.accessToken=null;
            state.refreshToken=null;
            state.isAuthenticated=false;
            state.error=null;

            localStorage.removeItem('accessToken')

            localStorage.removeItem('refreshToken')
        }
    },

    extraReducers:(builder)=>{
        builder

        // Register
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })

        .addCase(registerUser.fulfilled,(state)=>{
            state.loading=false;
            state.error=null;
        })
        
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        // LOGIN

        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })

        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;

            state.accessToken =action.payload.access;

            state.refreshToken =action.payload.refresh;

            state.isAuthenticated = true;

            state.error = null;
            state.user=action.payload;
        })

        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        // Fetch Profile
        .addCase(fetchProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })

        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload;
        })

        .addCase(fetchProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export const { logout }=authSlice.actions;

export default authSlice.reducer