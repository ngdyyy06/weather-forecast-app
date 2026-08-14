package weatherapp.dto;

public class WeatherResponse {
    private Location location;
    private Current current;
    private Forecast forecast;

    public Forecast getForecast() {
        return forecast;
    }

    public void setForecast(Forecast forecast) {
        this.forecast = forecast;
    }

    public Current getCurrent() {
        return current;
    }

    public Location getLocation() {
        return location;
    }

    public void setCurrent(Current current) {
        this.current = current;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
