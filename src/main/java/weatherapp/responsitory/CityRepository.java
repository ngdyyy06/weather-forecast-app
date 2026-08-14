package weatherapp.responsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import weatherapp.entity.City;


// Repository này dùng để thao tác với bảng cities trong mysql thông qua Entity và ID của City là Integer
public interface CityRepository extends JpaRepository<City, Integer> {

    City findByNameIgnoreCase(String name);   // Spring data JPA sẽ tự tạo câu SQL tương ứng
}
