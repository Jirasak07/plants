
const protocol = window.location.protocol;
const domain = window.location.hostname;
const port = window.location.port;

const host = `${protocol}//${domain}:${port? port : ""}`
// export const API = `${host}/backend`;
export const API = "https://www.rspg-kpppao.com/backend"



