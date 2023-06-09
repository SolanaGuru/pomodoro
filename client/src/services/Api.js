import axios from "axios";

const { hostname, port } = window.location;

const serverUrl = `https://${hostname}:${port}`;

// const serverUrl = "http://localhost";
const Api = axios.create({ baseURL: `${serverUrl}/api/` });

export { Api };
