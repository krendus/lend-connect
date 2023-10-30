import { axiosInstance } from "./axios"

export const becomeAgent = () => {
    return axiosInstance().post("/users/become-agent")
}
export const fetchAgentLendings = (id: string) => {
    return axiosInstance().get(`/explore/agents/${id}/lendings`);
}
export const fetchAgentAssignedLendings = () => {
    return axiosInstance().get(`/agent/lendings`)
}
