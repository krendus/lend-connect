import { axiosInstance } from "./axios"

export const becomeAgent = () => {
    return axiosInstance().post("/users/become-agent")
}
