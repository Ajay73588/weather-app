
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ErrorAlert from '@/components/ErrorAlert';
import { fetchWeatherByCity, WeatherData } from '@/services/weatherService';
import { Cloud, Sun } from 'lucide-react';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-weather-blue to-weather-blue-dark p-3 rounded-full shadow-md">
              <Sun className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-weather-blue bg-clip-text text-transparent">
              Weather Dashboard
            </h1>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && <div className="flex justify-center"><ErrorAlert message={error} /></div>}
        
        <div className="flex justify-center mt-8">
          {isLoading ? (
            <div className="text-center p-8 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 max-w-md">
              <div className="animate-pulse flex flex-col items-center space-y-6">
                <div className="rounded-full bg-weather-blue/30 h-16 w-16"></div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="h-4 bg-weather-blue/30 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-weather-blue/20 rounded w-1/2 mx-auto"></div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="h-4 bg-weather-blue/10 rounded"></div>
                    <div className="h-4 bg-weather-blue/10 rounded"></div>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-gray-600 font-medium">Loading weather data...</p>
            </div>
          ) : weatherData ? (
            <WeatherCard weatherData={weatherData} />
          ) : (
            <div className="text-center p-8 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 max-w-md transition-all hover:shadow-lg">
              <div className="bg-weather-blue-light p-4 rounded-full inline-flex mb-6">
                <Cloud className="h-12 w-12 text-weather-blue mx-auto opacity-80" />
              </div>
              <h2 className="text-2xl font-medium text-gray-700 mb-3">Weather Information</h2>
              <p className="text-gray-600">Search for a city to see the current weather conditions.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Made with ❤️ using React, Vite and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
