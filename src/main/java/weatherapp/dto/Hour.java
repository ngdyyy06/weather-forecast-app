package weatherapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Hour {
    private String time;
    private Condition condition;

    @JsonProperty("temp_c")
    private double tempC;

    @JsonProperty("chance_of_rain")
    private int chanceOfRain;

    public Condition getCondition() {
        return condition;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getTempC() {
        return tempC;
    }

    public int getChanceOfRain() {
        return chanceOfRain;
    }

    public void setChanceOfRain(int chanceOfRain) {
        this.chanceOfRain = chanceOfRain;
    }

    public void setTempC(double tempC) {
        this.tempC = tempC;
    }
}
