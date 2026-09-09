import axios from "axios";

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type": "application/json",
    }
})



api.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem('accessToken')

        if(accessToken){
            config.headers.Authorization= `Bearer ${accessToken}`;
        }

        return config
    },
    (error) => {
        return Promise.reject(error);
    }
    
)

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken =
                    localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/auth/token/refresh/",
                    {
                        refresh: refreshToken,
                    }
                );

                const newAccessToken = response.data.access;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;