package weatherapp.dto;

import java.util.List;

public class ForecastDay {
    private String date;
    private Day day;
    private List<Hour> hour;

    public List<Hour> getHour() {
        return hour;
    }

    public void setHour(List<Hour> hour) {
        this.hour = hour;
    }

    public Day getDay() {
        return day;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setDay(Day day) {
        this.day = day;
    }

    public String getDate() {
        return date;
    }
}
