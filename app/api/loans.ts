import { axiosInstance } from "./axios"

export const getAllLoans = () => {
    return axiosInstance().get("/loans");
}
export const getSingleLoan = (id: any) => {
    return axiosInstance().get(`/loans/${id}`);
}
export const getLendings = () => {
    return axiosInstance().get("/lendings");
}
export const getSingleLending = (id: any) => {
    return axiosInstance().get(`/lendings/${id}`);
}
export const createLending = (body: any) => {
    return  axiosInstance().post("/lendings", body);
}
export const updateLending = (body: any) => {
    return axiosInstance().patch("/lendings", body);
}
export const applyForLoan = (body: any) => {
    return axiosInstance().post("/loan-applications", body)
}
