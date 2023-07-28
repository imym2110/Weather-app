import s from "./style.module.css";
import { BASE_URL, API_KEY_PARAM } from "./config";
import { useEffect, useState } from "react";
import { WeatherApi } from "./weather-api";

export function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [logo, setLogo] = useState("");
  const [location, setLocation] = useState("");
  const [humid, setHumid] = useState("");
  const [feel, setFeel] = useState("");
  const [desc, setDesc] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let res = await WeatherApi.fetchCity(city);
  //     console.log("==>", res);
  //     return res;
  //   };
  //   fetchData();
  // }, [city]);

  return (
    <div>
      <form
        className={s.form}
        onSubmit={async (e) => {
          e.preventDefault();
          if (city) {
            let res = await WeatherApi.fetchCity(city);
            console.log("hi", res);
            if (res?.status == 200) {
              setTemp(Math.round(res.data.main.temp));
              setLogo(res.data.weather[0].icon);
              setLocation(res.data.name);
              setHumid(res.data.main.humidity);
              setFeel(Math.round(res.data.main.feels_like));
              setDesc(res.data.weather[0].description);
            }
          }
        }}
      >
        <input
          className={s.city}
          type="text"
          placeholder="Enter city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button type="submit" className={s.button}>
          Check Weather
        </button>
      </form>
      {temp && (
        <div className={s.weather_container}>
          <h2 className={s.para}>
            {temp}°C in {location}
          </h2>
          {logo && (
            <img
              className={s.weather_image}
              src={`http://openweathermap.org/img/w/${logo}.png`}
              alt="icon"
            />
          )}
        </div>
      )}
      {desc && <h3 className={s.desc}>{desc}</h3>}
      {feel && <h4 className={s.feel}>Feels Like : {feel}°C </h4>}
      {humid && <h4 className={s.humidity}>Humidity Index : {humid}</h4>}
    </div>
  );
}

export default App;
