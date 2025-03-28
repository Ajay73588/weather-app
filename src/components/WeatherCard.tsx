
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData, getWeatherIconUrl } from '@/services/weatherService';
import { Cloud, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { name, main, weather, wind, sys } = weatherData;
  
  return (
    <Card className="w-full max-w-md shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl flex justify-between items-center">
          <div>
            {name}, {sys.country}
          </div>
          <div className="text-weather-blue font-bold">
            {Math.round(main.temp)}°C
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center mb-6">
          <div className="mr-4">
            <img 
              src={getWeatherIconUrl(weather[0].icon)} 
              alt={weather[0].description}
              className="w-20 h-20"
            />
          </div>
          <div className="flex-grow">
            <p className="text-xl capitalize mb-1">{weather[0].description}</p>
            <p className="text-sm text-muted-foreground">
              Feels like: {Math.round(main.feels_like)}°C
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-2 text-weather-blue" />
            <div>
              <p className="text-sm font-medium">Temperature</p>
              <p className="text-lg">{Math.round(main.temp)}°C</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Droplets className="h-5 w-5 mr-2 text-weather-blue" />
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-lg">{main.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Wind className="h-5 w-5 mr-2 text-weather-blue" />
            <div>
              <p className="text-sm font-medium">Wind Speed</p>
              <p className="text-lg">{wind.speed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Cloud className="h-5 w-5 mr-2 text-weather-blue" />
            <div>
              <p className="text-sm font-medium">Condition</p>
              <p className="text-lg">{weather[0].main}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
