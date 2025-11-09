import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Cloud, Droplets, Wind } from 'lucide-react';

interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

const WeatherWidget = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '2299e31699747bf4d0e898fae8f70ecc';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Fetch weather data
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            
            if (!response.ok) throw new Error('Failed to fetch weather data');
            
            const data = await response.json();
            
            setWeather({
              temp: Math.round(data.main.temp),
              humidity: data.main.humidity,
              windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
              description: data.weather[0].description,
              icon: data.weather[0].icon
            });
            setLoading(false);
          },
          (error) => {
            setError('Location access denied. Using default location.');
            // Fallback to a default location (New Delhi)
            fetchDefaultWeather();
          }
        );
      } catch (err) {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    const fetchDefaultWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          description: data.weather[0].description,
          icon: data.weather[0].icon
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t('dashboard.currentWeather')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t('dashboard.currentWeather')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error || 'Weather data unavailable'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          {t('dashboard.currentWeather')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{weather.temp}°C</div>
            <p className="text-sm text-muted-foreground capitalize">{weather.description}</p>
          </div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-16 h-16"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-accent" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-accent" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
