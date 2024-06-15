import { useNavigate } from "react-router-dom";
import "./SearchFeild.css";

const SearchFeild = ({ searchCity, handleChange, handleSearch }) => {
  const Navigate = useNavigate();
  const handleNagigateHistory = () => {
    Navigate("./history");
  };
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
  const handleSearchAndSave = () => {
    // Save search to local storage
    const searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];
    const newSearch = {
      location: searchCity,
      time: formatDateTime(new Date()),
    };
    searches.push(newSearch);
    localStorage.setItem("weatherSearches", JSON.stringify(searches));

    // Trigger the search handler
    handleSearch();
  };
  return (
    <div className="weather-container">
      <div className="weather-header">Weather</div>
      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter City"
          className="weather-input"
          value={searchCity}
          onChange={handleChange}
        />
        <button className="weather-button" onClick={handleSearchAndSave}>
          Search
        </button>
        <button
          className="weather-history-button"
          onClick={handleNagigateHistory}
        >
          History
        </button>
      </div>
    </div>
  );
};

export default SearchFeild;
