import { useEffect, useState } from "react";
import { WiHumidity, WiStrongWind, WiBarometer, WiDayHaze, WiThermometerExterior, WiWindDeg, WiSmoke } from "react-icons/wi";

const WeatherCard = () => {

    const [bdTime, setBdTime] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

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
            alert("Geolocation is not supported by this browser.");
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
    }, []);

    return (
        <div className="max-w-xl mt-5 border border-gray-500 text-white rounded-xl p-6 bg-transparent">
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
        </div>
    );
};

export default WeatherCard;
