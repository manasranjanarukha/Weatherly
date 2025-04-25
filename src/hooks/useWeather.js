import { useEffect, useRef, useState } from "react";

const API_KEY = "f865234152af44636928b632641bcbd6";

export default function useWeather() {
  const searchElement = useRef();
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Fetch weather data
  const fetchWeather = (location) => {
    setLoading(true);
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

    fetch(URL)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setRecentSearches((prev) =>
          [...prev.filter((c) => c !== data.name), data.name].slice(-3)
        );
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setWeatherData(null);
        alert("Please enter a valid city name");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle search button click
  // This will fetch the weather data for the city entered in the search input
  const handleSearch = () => {
    const location = searchElement.current.value;
    searchElement.current.value = "";
    fetchWeather(location);
  };
  // Get user's location
  // This will fetch the user's location and set the city state to the name of the city
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) setCity(data[0].name);
          });
      },
      (error) => {
        console.error("Location error:", error.code, error.message);
      }
    );
  }, []);

  // Fetch weather data when the city changes
  // This will fetch the weather data for the city set in the state
  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  //
  return {
    fetchWeather,
    weatherData,
    city,
    loading,
    searchElement,
    handleSearch,
    recentSearches,
  };
}
