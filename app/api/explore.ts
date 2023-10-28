import { axiosInstance } from "./axios"

export const exploreAgents = (latlng: string) => {
    return axiosInstance().get(`/explore/agents?latlng=${latlng}`)
}
