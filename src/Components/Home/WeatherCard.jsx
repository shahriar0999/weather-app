import { useEffect, useState } from "react";
import { WiHumidity, WiStrongWind, WiBarometer, WiDayHaze, WiThermometerExterior, WiWindDeg, WiSmoke } from "react-icons/wi";
import { ToastContainer, toast } from 'react-toastify';
import { fetchWeatherApi } from 'openmeteo';
const WeatherCard = () => {

    const [bdTime, setBdTime] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [weatherData , setWeatherData] = useState(null);

    useEffect(() => {
        function updateTime() {
            const time = new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Dhaka",
                hour12: true,
                hour: "numeric",
                minute: "numeric",
                // second: "numeric",
            });
            setBdTime(time);
        }

        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, []);


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    };

    function success(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    function error() {
        alert("Sorry, no position available.");
    }

    useEffect(() => {
        getLocation();
        latitude && longitude && GetWeatherData();
    }, []);
    const GetWeatherData = async () => {
        try {
            const params = {
                "latitude": latitude,
                "longitude": longitude,
                "hourly": "temperature_2m",
            };
            
            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);

            // Process first location. Add a for-loop for multiple locations or weather models
            const response = responses[0];

            // Attributes for timezone and location
            const Latitude = response.latitude();
            const Longitude = response.longitude();
            const elevation = response.elevation();
            const utcOffsetSeconds = response.utcOffsetSeconds();

            console.log(
                `\nCoordinates: ${Latitude}°N ${Longitude}°E`,
                `\nElevation: ${elevation}m asl`,
                `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
            );

            const hourly = response.hourly();

            // Note: The order of weather variables in the URL query and the indices below need to match!
            const weatherData = {
                hourly: {
                    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature_2m: hourly.variables(0).valuesArray(),
                },
            };

            // 'weatherData' now contains a simple structure with arrays with datetime and weather data
            console.log("\nHourly data", weatherData.hourly)
            setWeatherData(weatherData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="max-w-xl mt-5 border border-gray-500 text-white rounded-xl p-6 bg-transparent">

            <ToastContainer />
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-base text-gray-300 font-semibold">Current weather</p>

                    <p className="text-sm text-gray-100">{bdTime}</p>
                    <div className="flex items-center gap-3 mt-2">
                        {/* <WiDayHaze size={50} className="text-yellow-300" /> */}
                        <img src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Hazy-Night.svg" className="w-14" alt="" />
                        <h1 className="text-5xl font-normal">26°C</h1>
                        <div>
                            <p className="text-lg">Haze</p>
                            <p className="text-sm text-gray-400">Feels like 28°</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-200">
                        Latitude : {latitude} , Longitude : {longitude}
                    </p>
                </div>
            </div>

            <hr className="my-4 border-gray-600" />

            <div className="grid grid-cols-3 gap-y-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                    <WiSmoke size={24} />
                    <span>Air quality: <span className="text-yellow-300">72</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <WiStrongWind size={24} />
                    <span>Wind: 6 km/h</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiHumidity size={24} />
                    <span>Humidity: 86%</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiWindDeg size={24} />
                    <span>Visibility: 3.5 km</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiBarometer size={24} />
                    <span>Pressure: 1007 mb</span>
                </div>
                <div className="flex items-center gap-2">
                    <WiThermometerExterior size={24} />
                    <span>Dew point: 23°</span>
                </div>
            </div>
            {/* Hourly Forecast */}
            {weatherData?.hourly && (
                <div className="mt-6">
                    <p className="text-gray-300 font-semibold mb-2">Hourly Forecast</p>
                    <div className="flex overflow-x-auto gap-3 py-2">
                        {weatherData.hourly.time.map((time, idx) => {
                            const temp = weatherData.hourly.temperature_2m[idx];
                            const hour = new Date(time).getHours();
                            const ampm = hour >= 12 ? "PM" : "AM";
                            const displayHour = hour % 12 === 0 ? 12 : hour % 12;

                            return (
                                <div
                                    key={idx}
                                    className="flex-none w-20 p-3 bg-gray-800 rounded-xl text-center shadow-md"
                                >
                                    <p className="text-sm text-gray-400">{displayHour} {ampm}</p>
                                    <img
                                        src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/Hazy-Night.svg"
                                        className="w-8 mx-auto my-1"
                                        alt="icon"
                                    />
                                    <p className="text-lg font-semibold">{Math.round(temp)}°C</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

        </div>
    );
};

export default WeatherCard;
