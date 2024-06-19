import React, { useState } from "react";
import s from "./style.module.css";
import { fetchCity } from "./weather-api";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import { FormControl, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import DarkModeToggle from "react-dark-mode-toggle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function App() {
  const Dayurl = require("./assets/images/jeremy-bishop-LnMcM8IC40Y-unsplash.jpg");
  const Nighturl = require("./assets/images/night.avif");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [logo, setLogo] = useState("");
  const [location, setLocation] = useState("");
  const [humid, setHumid] = useState("");
  const [feel, setFeel] = useState("");
  const [desc, setDesc] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [timing, setTiming] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [favoriteCity, setFavoriteCity] = useState([]);

  const ampm = (timestamp) => {
    const dat = new Date(timestamp * 1000).toLocaleDateString();
    console.log("===><", dat);
    const date = new Date(timestamp * 1000);
    const formattedHours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div
      className={s.body}
      style={{
        backgroundImage: `url(${isDarkMode ? Nighturl : Dayurl})`,
      }}
    >
      <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={70} className={s.toggle} />
      <form
        className={s.form}
        onSubmit={async (e) => {
          e.preventDefault();
          if (city) {
            let res = await fetchCity(city);
            console.log("hi", res);
            if (res?.status == 200) {
              setTemp(Math.round(res.data.main.temp));
              setLogo(res.data.weather[0].icon);
              setLocation(res.data.name);
              setHumid(res.data.main.humidity);
              setFeel(Math.round(res.data.main.feels_like));
              setDesc(res.data.weather[0].description);
              setWindSpeed(res.data.wind.speed);
              setTiming({
                sunrise: res.data.sys.sunrise,
                sunset: res.data.sys.sunset,
              });
            }
          }
        }}
      >
        <input
          className={!isDarkMode ? `${s.city}` : `${s.cityDark}`}
          type="text"
          placeholder="Enter city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button type="submit" className={s.button}>
            Check Weather
          </button>

          <button
            className={s.badgeButton}
            onClick={() => {
              if (!favoriteCity.includes(city)) {
                setFavoriteCity((item) => [...item, city]);
              }
            }}
          >
            <FavoriteBorderIcon style={{ paddingBottom: "1px", paddingRight: "3px" }} />
            Favourite
          </button>
        </div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="filled">
          <InputLabel id="demo-select-small-label">Favourite city</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Favorite city"
            onChange={async (e) => {
              e.preventDefault();
              if (city) {
                let res = await fetchCity(e.target.value);
                console.log("hi", res);
                if (res?.status == 200) {
                  setTemp(Math.round(res.data.main.temp));
                  setLogo(res.data.weather[0].icon);
                  setLocation(res.data.name);
                  setHumid(res.data.main.humidity);
                  setFeel(Math.round(res.data.main.feels_like));
                  setDesc(res.data.weather[0].description);
                  setWindSpeed(res.data.wind.speed);
                  setTiming({
                    sunrise: res.data.sys.sunrise,
                    sunset: res.data.sys.sunset,
                  });
                }
              }
            }}
          >
            {favoriteCity.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* {console.log("--->", favoriteCity)} */}
      </form>

      {temp && (
        <div className={s.weather_container}>
          <h2 className={!isDarkMode ? `${s.para}` : `${s.paraDark}`}>
            {temp}°C/{Math.ceil(temp * 1.8 + 32)}°F in {location}
          </h2>
          {logo && <img className={s.weather_image} src={`http://openweathermap.org/img/w/${logo}.png`} alt="icon" />}
        </div>
      )}
      {desc && <h3 className={!isDarkMode ? `${s.desc}` : `${s.descDark}`}>{desc}</h3>}
      {feel && <h4 className={!isDarkMode ? `${s.feel}` : `${s.feelDark}`}>Feels Like : {feel}°C </h4>}
      {humid && <h4 className={!isDarkMode ? `${s.humidity}` : `${s.humidityDark}`}>Humidity Index : {humid}</h4>}
      {windSpeed && <h4 className={!isDarkMode ? `${s.windSpeed}` : `${s.windSpeedDark}`}>Wind speed : {windSpeed}</h4>}
      <div className={!isDarkMode ? `${s.timing}` : `${s.timingDark}`}>
        {timing.sunrise && (
          <h4 className={s.sunrise}>
            <WbSunnyIcon className={s.sunriseIcon} /> {ampm(timing.sunrise)}
          </h4>
        )}
        {timing.sunset && (
          <h4 className={s.sunset}>
            <WbTwilightIcon className={s.sunsetIcon} /> {ampm(timing.sunset)}
          </h4>
        )}
      </div>
    </div>
  );
}
export default App;
