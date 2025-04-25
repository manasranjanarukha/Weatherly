import SearchDetails from "./components/SearchDetails";
import WeatherDetails from "./components/WeatherDetails";
import Spinner from "./components/Spinner";
import useWeather from "./hooks/useWeather";

function App() {
  const {
    fetchWeather,
    weatherData,
    loading,
    searchElement,

    recentSearches,
  } = useWeather();

  return (
    <>
      <div className="container">
        <SearchDetails
          searchElement={searchElement}
          fetchWeather={fetchWeather}
          recentSearches={recentSearches}
          weatherData={weatherData}
        />

        {loading ? (
          <Spinner />
        ) : weatherData ? (
          <WeatherDetails weatherData={weatherData} />
        ) : null}
      </div>
    </>
  );
}

export default App;
