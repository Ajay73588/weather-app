
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ErrorAlert from '@/components/ErrorAlert';
import { fetchWeatherByCity, WeatherData } from '@/services/weatherService';
import { Cloud } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Cloud className="h-8 w-8 text-weather-blue" />
            <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && <div className="flex justify-center"><ErrorAlert message={error} /></div>}
        
        <div className="flex justify-center mt-6">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">Loading weather data...</p>
            </div>
          ) : weatherData ? (
            <WeatherCard weatherData={weatherData} />
          ) : (
            <div className="text-center p-8 bg-weather-blue-light rounded-lg max-w-md">
              <Cloud className="h-12 w-12 text-weather-blue mx-auto mb-4 opacity-80" />
              <h2 className="text-xl font-medium text-gray-700 mb-2">Weather Information</h2>
              <p className="text-gray-600">Search for a city to see the current weather conditions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
