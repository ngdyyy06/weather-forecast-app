package weatherapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import weatherapp.dto.WeatherResponse;
import weatherapp.service.WeatherService;

@Controller
public class WeatherController {
    private final WeatherService weatherService;  // Nhận request rồi chuyển sang Service

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @ResponseBody
    @GetMapping("/weather")
    public WeatherResponse getWeather(@RequestParam String city) {  // Lấy data từ url
        return weatherService.getWeather(city);
    }

    @GetMapping("/suggest")
    @ResponseBody
    public String suggest(@RequestParam String city) {
        return weatherService.searchCity(city);
    }
}
