import { axiosInstance } from "./axios"

export const getAllLoans = () => {
    return axiosInstance().get("/packages");
}
export const getSingleLoan = (id: any) => {
    return axiosInstance().get(`/packages/${id}`);
}
