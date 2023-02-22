import axios from "axios";
import { BASE_URL } from "@/lib/constants";

const $axios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export default $axios;
