package weatherapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import weatherapp.entity.City;
import weatherapp.responsitory.CityRepository;
import java.util.List;

@RestController   // nói với Spring class này tạo API để JavaScript gọi
@RequestMapping("/favorite")   // API bắt đầu bằng /favorite
public class FavouriteController {
    @Autowired
    private CityRepository cityRepository;

    public FavouriteController (CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @PostMapping(consumes = "application/json")   // API gửi POST /favorite -> Spring chạy hàm addFavourite
    public City addFavourite(@RequestBody City city) {
        City existingCity = cityRepository.findByNameIgnoreCase(city.getName());

        if (existingCity != null) {
            return existingCity;
        }

        return cityRepository.save(city);
    }

    @GetMapping
    public List<City> getFavorite() {
        return cityRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteFavorite(@PathVariable int id) {
        cityRepository.deleteById(id);
    }
}
