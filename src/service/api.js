import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7289/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})

api.interceptors.request.use((config) => {

    // const token = localStorage.getItem('token');
    // if(token) {

    //     config.headers.Authorization = `Bearer ${token}`;

    // }
    // console.log("Interceptor Token Set: ", token);
    console.log('API Request:', config.url)
return config;

},
(error) => {
    return Promise.reject(error);
}
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {

        if (error.response?.status === 401) {
            console.log('Unauthorized - Session expired')
        }

        return Promise.reject(error)
    }
)
    
export default api