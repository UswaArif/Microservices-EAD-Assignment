import React, { useState } from "react";

function Weather() {
    const [city, setCity] = useState(""); // State to hold the city input value
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showWeather, setShowWeather] = useState(false); // State to indicate whether weather data should be shown

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const apiKey = '005e12512273a1f5e1c7a860cdd7795d'; // Replace 'YOUR_API_KEY' with your actual API key
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }

            const data = await response.json();
            setWeatherData(data);
            setShowWeather(true);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
                <div className="container mt-5">
                    <h2 className="mb-4">Weather</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="cityInput">Enter City:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cityInput"
                                value={city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Get Weather</button>
                        {/* Display weather data only when showWeather is true */}
                        {showWeather && weatherData && (
                            <div>
                                <h3>Weather Information</h3>
                                <p><strong>City:</strong> {weatherData.name}</p>
                                <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
                                <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
                                <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                                <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                            </div>
                        )}
                    </form>
                    {isLoading && <div className="mt-3">Loading...</div>}
                    {error && <div className="mt-3 text-danger">Error: {error.message}</div>}
                </div>
            </div>
       
    );
}

export default Weather;
