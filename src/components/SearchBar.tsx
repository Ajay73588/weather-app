
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2 transition-all hover:shadow-md p-1 rounded-lg">
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="flex-grow border-weather-blue/30 focus-visible:ring-weather-blue/50 transition-all"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !city.trim()}
        className="bg-gradient-to-r from-weather-blue to-weather-blue-dark text-white hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        {isLoading ? "Searching..." : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default SearchBar;
