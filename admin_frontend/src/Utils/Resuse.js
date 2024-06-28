import localstorageEncrypt from "localstorage-encrypt";
import axios from "axios";
var ip = import.meta.env.VITE_ip;
var host = import.meta.env.VITE_port;
export const LS = localstorageEncrypt.init("Quillbot", "RGBQUILLBOT");
export const Baseaxios = axios.create({
  baseURL: `https://${ip}:${host}/`,
  headers: { Authorization: `Bearer ${LS.get("access_token")}` },
});
