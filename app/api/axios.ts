import axios from "axios"

export const axiosInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("lendconnect-token");
    return axios.create({
        baseURL: `https://lendconnectbe.up.railway.app/api/v1`,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
  };
