package weatherapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import weatherapp.dto.WeatherResponse;
import weatherapp.entity.City;
import weatherapp.responsitory.CityRepository;
import weatherapp.entity.City;
import tools.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;

@Service  // Lớp xử lí nghiệp vụ
public class WeatherService {
    private final RestClient restClient;  // Biến dùng để gọi API
    private final ObjectMapper objectMapper;

    public WeatherService(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    @Value("${weather.api.key}")  // Đọc dữ liệu
    private String apiKey;

    @Value("${weather.api.url}")  // Đọc dữ liệu
    private String apiUrl;

    public WeatherResponse getWeather(String city) {      // Hiển thị trên đường path
        String url = apiUrl
                + "?key=" + apiKey
                + "&q=" + city
                + "&days=7"
                + "&aqi=yes"
                + "&alerts=no"
                + "&lang=en";

        System.out.println(url);

        byte[] bytes = restClient.get()
                .uri(url)
                .retrieve()
                .body(byte[].class);

        String json = new String(bytes, java.nio.charset.StandardCharsets.UTF_8);
        json = fixEncoding(json);
        WeatherResponse response = objectMapper.readValue(json, WeatherResponse.class);

        return response;
    }

    public String searchCity(String city) {
        String url = apiUrl
                .replace("/forecast.json", "/search.json")
                + "?key=" + apiKey
                + "&q=" + city;

        return restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
    }

    // Hàm fix lỗi kí tự có dấu
    private String fixEncoding(String text) {
        try {
            return new String(
                    text.getBytes(StandardCharsets.ISO_8859_1),
                    StandardCharsets.UTF_8
            );
        } catch (Exception e) {
            return text;
        }
    }
}
