import api from "./api";

const register=async(userData)=>{
    const response=await api.post('/auth/register/',userData)

    return response.data
}

const login=async(credentials)=>{
    const response=await api.post('/auth/login/',credentials)

    return response.data
}

const refreshToken=async(refresh)=>{
    const response=await api.post('/auth/token/refresh/',refresh)

    return response.data
}

const getProfile=async()=>{
    const response=await api.get('/auth/profile/')

    return response.data
}

const authService={register,login,refreshToken,getProfile}

export default authService

