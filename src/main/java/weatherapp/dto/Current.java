package weatherapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Current {

    @JsonProperty("temp_c")
    private double tempC;                      // Độ C
    private int humidity;                       // Độ ẩm
    @JsonProperty("wind_kph")
    private double windKph;                    // Gió
    private Condition condition;                // Điều kiện thoi tiết

    @JsonProperty("feelslike_c")
    private double feelsLikeC;                 // Nhiệt độ cảm nhận
    @JsonProperty("pressure_mb")
    private double pressureMb;                 // Áp suất khí quyển
    @JsonProperty("vis_km")
    private double visKm;                      // Tầm nhìn (km)
    private double uv;                          // Chỉ số tia UV

    @JsonProperty("air_quality")
    private AirQuality airQuality;

    // getter
    public double getTempC() {
        return tempC;
    }

    public int getHumidity() {
        return humidity;
    }

    public double getWindKph() {
        return windKph;
    }

    public Condition getCondition() {
        return condition;
    }

    public double getFeelsLikeC() {
        return feelsLikeC;
    }

    public double getPressureMb() {
        return pressureMb;
    }

    public double getVisKm() {
        return visKm;
    }

    public double getUv() {
        return uv;
    }

    public AirQuality getAirQuality() {
        return airQuality;
    }

    // setter
    public void setTempC(double tempC) {
        this.tempC = tempC;
    }

    public void setHumidity(int humidity) {
        this.humidity = humidity;
    }

    public void setWindKph(double windKph) {
        this.windKph = windKph;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }

    public void setFeelsLikeC(double feelsLikeC) {
        this.feelsLikeC = feelsLikeC;
    }

    public void setPressureMb(double pressureMb) {
        this.pressureMb = pressureMb;
    }

    public void setVisKm(double visKm) {
        this.visKm = visKm;
    }

    public void setUv(double uv) {
        this.uv = uv;
    }

    public void setAirQuality(AirQuality airQuality) {
        this.airQuality = airQuality;
    }
}
