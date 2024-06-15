import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./History.css";

const WeatherListHistory = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("weatherSearches")) || [];
    setWeatherData(storedSearches);
  }, []);

  const handleDelete = (time) => {
    const newData = weatherData.filter((item) => item.time !== time);
    setWeatherData(newData);
    localStorage.setItem("weatherSearches", JSON.stringify(newData));
  };

  const handleEdit = () => {
    alert("cant edit ");
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="weather-containerHis">
      <button className="back-button" onClick={handlePrevious}>
        BACK
      </button>
      {weatherData.length === 0 ? (
        <div className="no-data-found">No data found</div>
      ) : (
        weatherData.map((item, index) => (
          <div key={index} className="weather-itemHis">
            <div>
              {item.location} {item.time}
            </div>
            <div>
              <MdModeEdit
                onClick={() => handleEdit(item.time)}
                className="icon"
              />
              <FaTrash
                onClick={() => handleDelete(item.time)}
                className="icon"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WeatherListHistory;
