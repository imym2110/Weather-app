import axios from "axios";
import { BASE_URL, API_KEY_PARAM, GEO_URL } from "./config";

// export class WeatherApi {
//   static async fetchCity(city) {
//     try {
//       console.log("===>");
//       const response = await axios.get(`${BASE_URL}q=${city}${API_KEY_PARAM}`);
//       return response;
//     } catch (error) {
//       alert("City Not Found");
//     }
//   }
// }

export const fetchCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}q=${city}${API_KEY_PARAM}`);
    return response;
  } catch (error) {
    alert("City Not Found");
  }
};
