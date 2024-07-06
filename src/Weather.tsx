import axios from "axios";
import $ from "jquery";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Map from "./Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Datetime from "react-datetime";
import Forecast from "./Forecast";

function Weather() {
  const [City, SetCity] = useState("");
  const [data, setData] = useState({});
  const [time, setTime] = useState("");
  const [latlon, setLatLon] = useState({});
  const apiKey = ""; //Replace with your key

  const fetchWeather = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then((res) => {
      //console.log(res.data);
      setData(res.data);
      setLatLon((latlon) => ({
        lat: res.data.coord.lat,
        lon: res.data.coord.lon,
      }));
      switch (res.data.weather[0].main) {
        case "Rain":
          $("#container1,#icon").removeClass();
          $("#container1,#icon").addClass("Rain");

          break;

        case "Clear":
          $("#container1,#icon").removeClass();
          $("#container1,#icon").addClass("Clear");
          break;

        case "Clouds":
          $("#container1,#icon").removeClass();
          $("#container1,#icon").addClass("Clouds");
          break;

        case "Snow":
          $("#container1,#icon").removeClass();
          $("#container1,#icon").addClass("Snow");
          break;
      }
    });
  };

  const schema = yup.object().shape({
    City: yup.string().required("*"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = () => {
    fetchWeather();
  };

  $(document).ready(function () {
    $(".City").on("click", function () {
      $("html, body").animate({
        scrollTop: $("#map").offset().top,
      });
    });
  });
  return (
    <>
      <div id="container1" className="container1">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          style={{ width: "100%" }}
        >
          <div className="search user-box">
            <input
              type="text"
              className=""
              required
              autoComplete="off"
              {...register("City")}
              onChange={(e) => SetCity(e.target.value)}
            ></input>
            <label>City</label>
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="CityCurrentInfo">
          <div className="WeatherInfo">
            {data.name !== undefined && (
              <div className="Main_Info">
                <div className="City_Degree">
                  <div className="City">
                    <p>{data.name}</p>
                    {/* <FontAwesomeIcon id="marker" icon={faLocationDot} /> */}
                  </div>
                  <div className="Degree">
                    {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                  </div>
                </div>
                <div id="icon" className={data.weather[0].main}></div>
                <div className="Mode">
                  {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
              </div>
            )}
            {data.name !== undefined && (
              <div className="Extra_Info">
                <div className="feels">
                  <p>Feels Like</p>
                  {data.main ? (
                    <p className="bold">
                      {Math.floor(data.main.temp.toFixed(0) * 1.8 + 32)}°F
                    </p>
                  ) : null}
                </div>
                <div className="humidity">
                  <p>Humidity</p>
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                </div>
                <div className="wind">
                  <p>Wind Speed</p>
                  {data.wind ? (
                    <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                </div>
                <div className="humidity">
                  <p>Pressure</p>
                  {data.main ? (
                    <p className="bold">{data.main.pressure}</p>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {data.name !== undefined && (
            <a href="#map" id="map">
              <Map lat={latlon.lat} long={latlon.lon}></Map>
            </a>
          )}
        </div>
        {data.name !== undefined && (
          <Forecast City={City} apiKey={apiKey}></Forecast>
        )}
      </div>
    </>
  );
}

export default Weather;
