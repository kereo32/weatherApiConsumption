/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { useEffect, useState } from 'react';
import useWeatherApiCall from './hooks/useWeatherApiCall';
import useWeatherToCallPicutre from './Hooks/useWeatherToCallPicture';

function App() {
  const [condition, setCondition] = useState<string>('');
  const [conditionPicture, setConditionPicture] = useState<string>('');
  const weather = useWeatherApiCall();
  const appClass = conditionPicture ? `bg-cover bg-center bg-no-repeat bg-fixed min-h-screen` : '';

  useEffect(() => {
    if (weather && weather.current) {
      setCondition(weather.current.condition.text);
    } else {
      console.log('Weather data not available');
    }
  }, [weather]);

  useEffect(() => {
    if (condition) {
      useWeatherToCallPicutre(condition).then((url) => setConditionPicture(url));
    }
  }, [condition]);

  return (
    <div className={`${appClass}`} style={{ backgroundImage: `url(${conditionPicture})` }}>
      <div className="flex items-center justify-center min-h-screen w-full">
        {weather && condition ? (
          <div>
            <h2 className="text-4xl text-white font-serif drop-shadow-lg"> {weather.location.country} </h2>
            <h1 className="text-2xl text-white font-serif drop-shadow-lg tracking-widest text-center" style={{ whiteSpace: 'pre-line' }}>
              {condition}
            </h1>
          </div>
        ) : (
          <h1 className="text-4xl text-black font-serif drop-shadow-lg"> Loading... </h1>
        )}
      </div>
    </div>
  );
}

export default App;
