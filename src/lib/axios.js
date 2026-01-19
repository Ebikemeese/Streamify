import axios from "axios"

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

export const axiosInstance = axios.create({
    baseURL: VITE_BASE_URL,
    withCredentials: true //send http cookies along requests
})