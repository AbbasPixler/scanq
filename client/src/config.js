import axios from 'axios'

export const axiosInstance = axios.create({
    // baseURL : "http://localhost:4545/api/"
    // baseURL: "https://snaqkyo.et.r.appspot.com/"
    baseURL: "https://api.budvista.co/"
})