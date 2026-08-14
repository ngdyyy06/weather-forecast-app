package weatherapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Forecast {
    @JsonProperty("forecastday")
    private List<ForecastDay> forecastDay;

    public List<ForecastDay> getForecastDay() {
        return forecastDay;
    }

    public void setForecastDay(List<ForecastDay> forecastDay) {
        this.forecastDay = forecastDay;
    }
}
