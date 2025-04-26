import { FaSearch } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import React, { useEffect } from "react";

function SearchDetails({ searchElement, fetchWeather, recentSearches }) {
  // const temprature = Math.round(weatherData.main.temp);

  const handleSearch = () => {
    const location = searchElement.current.value.trim();
    if (location) {
      fetchWeather(location);
    }
    searchElement.current.value = "";
  };
  return (
    <div>
      <div className="searchDetails">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Enter your Location"
            ref={searchElement}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="searchIcon" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <div className="recentSearches">
          {recentSearches.map((search, index) => (
            <div key={index} className="recentSearchButton">
              <MdHistory></MdHistory>
              <button
                className="recentSearchNameButton"
                onClick={() => fetchWeather(search)}
              >
                <p>
                  {" "}
                  {search}
                  {/* {search} */}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchDetails;
