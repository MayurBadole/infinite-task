import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Weather.css";
import SearchFeild from "./components/SearchFeild";
import axios from "axios";
import d2Img from "./Assets/02d@2x.png";
import snowImg from "./Assets/13d@2x.png";
import rainImg from "./Assets/10d@2x.png";
import thunderstormImg from "./Assets/11d@2x.png";
import mistImg from "./Assets/50n@2x.png";
import showerrainImg from "./Assets/09d@2x.png";
import brokencloudsImg from "./Assets/04d@2x.png";
import scatteredcloudsImg from "./Assets/03d@2x.png";
import clearImg1 from "./Assets/01d@2x.png";
import clearImg2 from "./Assets/01n@2x.png";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherData = () => {
  const [searchCity, setSearchCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [weatherData, setWeatherData] = useState();
  const handleChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather();
    setErrorMessage(null);
  };

  const data = {
    labels: ["11am", "2pm", "5pm", "8pm", "11pm", "2am", "5am", "8am"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [35, 35, 27, 29, 29, 31, 28, 28],
        fill: true,
        backgroundColor: "rgba(173, 216, 230, 0.5)",
        borderColor: "rgba(0, 0, 255, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        min: 25,
        max: 40,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
      },
    },
  };
  let weatherIcon;
  switch (weatherData?.list?.[0]?.weather?.[0]?.icon) {
    case "01d":
      weatherIcon = clearImg1;
      break;
    case "01n":
      weatherIcon = clearImg2;
      break;
    case "02d":
      weatherIcon = d2Img;
      break;
    case "02n":
      weatherIcon = d2Img;
      break;
    case "03d":
      weatherIcon = scatteredcloudsImg;
      break;
    case "03n":
      weatherIcon = scatteredcloudsImg;
      break;
    case "04d":
      weatherIcon = brokencloudsImg;
      break;
    case "04n":
      weatherIcon = brokencloudsImg;
      break;
    case "50n":
      weatherIcon = mistImg;
      break;
    case "50d":
      weatherIcon = mistImg;
      break;
    case "13n":
      weatherIcon = snowImg;
      break;
    case "13d":
      weatherIcon = snowImg;
      break;
    case "11n":
      weatherIcon = thunderstormImg;
      break;
    case "11d":
      weatherIcon = thunderstormImg;
      break;
    case "10n":
      weatherIcon = rainImg;
      break;
    case "10d":
      weatherIcon = rainImg;
      break;
    case "09n":
      weatherIcon = showerrainImg;
      break;
    case "09d":
      weatherIcon = showerrainImg;
      break;

    default:
      weatherIcon = clearImg1;
  }

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        "http://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: searchCity,
            units: "metric",
            cnt: 6,
            appid: "bf96c7e9be80c89165430ecc8f997aaf",
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      setErrorMessage("Data not found , Please try again");
    }
  };

  const tempData = weatherData?.list?.[0]?.main?.temp || "N/A";
  const weatherDatailts = weatherData?.list?.[0]?.weather?.[0]?.main || "N/A";

  const days = [
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
  ];
  const now = new Date();
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = { weekday: "long" };
    const day = date.toLocaleDateString("en-US", options);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hourIn12HrFormat = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}, ${hourIn12HrFormat}:${formattedMinutes} ${ampm}`;
  };

  const forecastData = weatherData?.list;
  return (
    <>
      <SearchFeild
        searchCity={searchCity}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      {weatherData && !errorMessage ? (
        <div className="weather-container">
          <div className="current-weather">
            <h2>{`${weatherData?.city?.name},${weatherData?.city?.country}`}</h2>
            <p>{formatDateTime(now)}</p>
            <p>{weatherDatailts}</p>
            <div className="temperature">
              <img src={weatherIcon} alt="weather img" />
              <span>{tempData}</span>
              <p>°C</p>
            </div>
          </div>
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>
          <div className="forecast">
            {forecastData.map((forecast, index) => {
              const day = days[index % days.length];
              const tempMax = forecast.main.temp_max;
              const tempMin = forecast.main.temp_min;
              const weatherIcon = forecast.weather[0].icon;
              const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

              return (
                <div key={index} className="forecast-day">
                  <p>{day}</p>
                  <img src={iconUrl} alt="weather icon" />
                  <p>
                    {Math.round(tempMax)}° | {Math.round(tempMin)}°
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="no-data-found">{errorMessage}</p>
      )}
    </>
  );
};

export default WeatherData;
