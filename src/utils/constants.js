// export const BASE_URL = "/api"
// export const BASE_URL = "http://localhost:4000";


export const BASE_URL =
    location.hostname === "localhost" ? "http://localhost:4000" : "/api";