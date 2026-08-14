package weatherapp.dto;

public class Location {
    private String name;
    private String country;
    private double lat;   // vĩ độ -> vị trí Bắc/Nam
    private double lon;   // kinh độ -> vị trí Đông/Tây

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
