import { axiosInstance } from "./axios"

export const exploreAgents = (latlng: string) => {
    return axiosInstance().get(`/explore/agents?latlng=${latlng}`)
}
export const exploreLendings = (latlng: string) => {
    return axiosInstance().get(`/explore/lendings?latlng=${latlng}`)
}
