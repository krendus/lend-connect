import { IUserLogin, IUserRegister } from "../interface/user.interface";
import { axiosInstance } from "./axios"

export const registerUser = (body: IUserRegister) => {
    return axiosInstance().post("/user/auth/register", body);
}
export const loginUser = (body: IUserLogin) => {
    return axiosInstance().post("/user/auth/login", body);
}
export const getUserProfile = () => {
    return axiosInstance().get("/user/personal/profile");
}
export const updateProfile = (body: any) => {
    return axiosInstance().post("/user/personal/profile/update", body);
}

