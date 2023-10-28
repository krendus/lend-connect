import { axiosInstance } from "./axios"

export const registerUser = (data: any) => {
    return axiosInstance().post("/auth/register", data)
}
export const loginUser = (data: any) => {
    return axiosInstance().post("/auth/login", data)
}
