import axios from "axios";
import { BASE_URL, API_KEY_PARAM } from "./config";

export class WeatherApi {
  static async fetchCity(city) {
    try {
      console.log("===>");
      const response = await axios.get(`${BASE_URL}q=${city}${API_KEY_PARAM}`);
      return response;
    } catch (error) {
      alert("City Not Found");
    }
  }
}
