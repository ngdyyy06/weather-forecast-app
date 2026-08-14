package weatherapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AirQuality {
    private double co;
    private double no2;
    private double o3;
    private double so2;

    @JsonProperty("pm2_5")
    private double pm25;
    private double pm10;

    @JsonProperty("us-epa-index")
    private int usEpaIndex;

    @JsonProperty("gb-defra-index")
    private int gbDefraIndex;

    public int getGbDefraIndex() {
        return gbDefraIndex;
    }

    public int getUsEpaIndex() {
        return usEpaIndex;
    }

    public double getCo() {
        return co;
    }

    public double getNo2() {
        return no2;
    }

    public double getO3() {
        return o3;
    }

    public double getPm10() {
        return pm10;
    }

    public double getPm25() {
        return pm25;
    }

    public double getSo2() {
        return so2;
    }

    public void setCo(double co) {
        this.co = co;
    }

    public void setNo2(double no2) {
        this.no2 = no2;
    }

    public void setO3(double o3) {
        this.o3 = o3;
    }

    public void setPm10(double pm10) {
        this.pm10 = pm10;
    }

    public void setPm25(double pm25) {
        this.pm25 = pm25;
    }

    public void setSo2(double so2) {
        this.so2 = so2;
    }

    public void setGbDefraIndex(int gbDefraIndex) {
        this.gbDefraIndex = gbDefraIndex;
    }

    public void setUsEpaIndex(int usEpaIndex) {
        this.usEpaIndex = usEpaIndex;
    }
}
