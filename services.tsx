import {API_KEY, BASE_URL} from "./Constants";
import axios from "axios";

export const wheater = axios.get(BASE_URL, {
    params: {
        lat: 59.894444,
        lon: 30.264168,
        cnt: 15,
        units: "metric",
        appid: API_KEY,
        lang: `ru`,
    }
}).then(response => response)