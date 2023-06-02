import { useState, useEffect } from 'react';

const BASE_URL: string = 'http://api.weatherapi.com/v1';
const API_KEY: string = import.meta.env.VITE_REACT_APP_SECRET_KEY || '';

const useWeatherApiCall = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`)
            .then((response: Response) => response.json())
            .then((data: object) => setWeather(data));
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return weather;
};

export default useWeatherApiCall;
