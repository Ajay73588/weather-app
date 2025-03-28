
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
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="flex-grow"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !city.trim()}
        className="bg-weather-blue hover:bg-weather-blue-dark text-white"
      >
        {isLoading ? "Searching..." : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default SearchBar;
