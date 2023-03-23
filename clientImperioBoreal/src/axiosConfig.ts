import axios from "axios";

export const api = axios.create({
  baseURL: 'https://deploy-imperioboreal-production.up.railway.app'
});