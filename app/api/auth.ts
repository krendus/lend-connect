import { axiosInstance } from "./axios"

export const registerUser = (data: any) => {
    console.log(data);
    return axiosInstance().post("/auth/register", data)
}
export const loginUser = (data: any) => {
    return axiosInstance().post("/auth/login", data)
}
export const getUserProfile = () => {
    return axiosInstance().get("/users/me");
}
