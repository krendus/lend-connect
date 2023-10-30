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
export const fetchAgentApplications = () => {
    return axiosInstance().get(`/agent/applications`)
}
export const fetchSingleApplication = (id: string) => {
    return axiosInstance().get(`/agent/applications/${id}`)
}
export const fetchAgentLoans = () => {
    return axiosInstance().get(`/agent/loans`)
}
export const fetchSingleLoan = (id: string) => {
    return axiosInstance().get(`/agent/loans/${id}`)
}
export const approveApplication = (id: string, body: any) => {
    return axiosInstance().post(`/agent/applications/${id}/approve`, body)
}
