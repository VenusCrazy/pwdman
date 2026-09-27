import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

let accessToken = null;

export function setApiToken(token) {
  accessToken = token;
}

// attach the access token to every request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// if a request fails with 401, silently refresh the token and retry once
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes("/auth/refresh")
    ) {
      original._retry = true;
      try {
        const { data } = await api.post("/api/auth/refresh");
        setApiToken(data.accessToken);
        return api(original);
      } catch {
        // refresh failed -> surface the original error
      }
    }
    return Promise.reject(error);
  }
);

export default api;