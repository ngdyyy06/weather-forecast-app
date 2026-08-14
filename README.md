🌤 Weather Forecast App
A modern, full-stack weather forecast web application built with Spring Boot and Vanilla JavaScript. Get real-time weather data, 7-day forecasts, hourly temperature charts, and air quality metrics for any city worldwide.

JavaSpring Boot JavaScript WeatherAPI License

📸 Preview
<img width="1901" height="911" alt="Screenshot 2026-08-15 015642" src="https://github.com/user-attachments/assets/2ca55d81-d23e-4508-bea0-7bba7a45913d" />

---

## ✨ Features

- 🔍 **City Search**  
  Tìm kiếm thời tiết cho bất kỳ thành phố nào với tính năng gợi ý autocomplete thông minh.

- 📍 **My Location**  
  Tự động định vị GPS để lấy dữ liệu thời tiết tại vị trí hiện tại với 1 click.

- 🌡️ **Real-Time Weather Metrics**  
  Hiển thị đầy đủ nhiệt độ, độ ẩm, tốc độ gió, cảm giác thực tế (feels like), tầm nhìn, áp suất khí quyển và chỉ số UV Index.

- ⏱️ **Today's Hourly Forecast**  
  Dự báo thời tiết chi tiết theo từng giờ trong ngày kèm xác suất có mưa và biểu tượng thời tiết.

- 📊 **24-Hour Temperature Chart**  
  Biểu đồ đường trực quan hóa biến thiên nhiệt độ 24 giờ liên tục được tích hợp bằng Chart.js.

- 📅 **7-Day Daily Forecast**  
  Dự báo thời tiết 7 ngày tiếp theo với nhiệt độ cao nhất/thấp nhất và icon trực quan.

- 🌫️ **Air Quality Index (AQI)**  
  Đo lường chi tiết chất lượng không khí gồm các hạt ô nhiễm: PM2.5, PM10, CO, NO₂, O₃, SO₂.

- ⭐ **Favorite Cities Management**  
  Lưu, xem nhanh và quản lý danh sách các thành phố yêu thích được đồng bộ với cơ sở dữ liệu.

- 🌡️ **°C / °F Unit Toggle**  
  Chuyển đổi linh hoạt giữa độ C và độ F ngay tức thì.

- 🌙 **Animated Dark / Light Mode Switch**  
  Công tắc trượt chuyển đổi giao diện sáng/tối mượt mà và tự động lưu trạng thái.

- 📱 **Fully Responsive Layout**  
  Giao diện tối ưu hoàn hảo trên mọi thiết bị (Mobile, Tablet, iPad, Laptop, PC).

## 📁 Project Architecture

- **`config/`** — `RestClientConfig.java` (Cấu hình kết nối HTTP client)
- **`controller/`** — `WeatherController`, `FavouriteController`, `HomeController` (Điều hướng và cung cấp REST API)
- **`dto/`** — Chứa các Data Transfer Objects (`WeatherResponse`, `Forecast`, `AirQuality`, `Current`...)
- **`entity/`** — `City.java` (Lưu thông tin thành phố yêu thích vào Database)
- **`responsitory/`** — `CityRepository.java` (Thao tác dữ liệu với Spring Data JPA)
- **`service/`** — `WeatherService.java` (Xử lý logic và gọi WeatherAPI)
- **`resources/static/`** — Giao diện Single Page Dashboard (`HTML`, `Vanilla CSS`, `JS`, `Chart.js`)

## 🚀 Getting Started

### Prerequisites
- **Java 21** or higher
- **Maven 3.8+**

---

### 1. Clone the Repository
```bash
git clone https://github.com/ngdyyy06/weather-forecast-app.git
cd weather-forecast-app

git clone https://github.com/ngdyyy06/weather-forecast.git
cd weather-forecast
2. Set Up Environment Variables
Open `src/main/resources/application.properties` and verify your API key is set:
```properties
weather.api.key=c94ee1bd78604bd48ae15057260508
weather.api.url=https://api.weatherapi.com/v1/forecast.json

bash

cp .env.example .env
Then open .env and set your key:

env

WEATHER_API_KEY=c94ee1bd78604bd48ae15057260508
3. Configure application.properties
Open src/main/resources/application.properties:

properties

server.port=https://ngdyyy-weather.onrender.com/
weather.api.key=${WEATHER_API_KEY}
weather.api.base-url=https://api.weatherapi.com/v1
4. Run the Application
bash

mvn spring-boot:run
The app will start at http://localhost:8080

5. Build for Production
bash

mvn clean package
java -jar target/weather-forecast-*.jar
🔑 API Reference
This project uses WeatherAPI.com. The following endpoints are consumed:

Endpoint	Data
/current.json	Current weather conditions
/forecast.json	7-day forecast + hourly data
/search.json	City autocomplete suggestions
⚠️ Never commit your API key. It is loaded from environment variables and excluded from version control via .gitignore.

🌐 Deployment
Deploy to Render (Free)
Push your code to GitHub
Go to render.com → New Web Service
Connect your GitHub repo
Set Build Command: mvn clean package -DskipTests
Set Start Command: java -jar target/weather-forecast-*.jar
Add environment variable: WEATHER_API_KEY = c94ee1bd78604bd48ae15057260508
Deploy to Railway
bash

# Install Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
Set WEATHER_API_KEY in Railway's environment variables dashboard.

🎨 UI Highlights
CSS Custom Properties — All colors defined as variables for instant dark/light mode switching
No CSS frameworks — 100% Vanilla CSS for full control and minimal footprint
Animated toggle switch — Sliding knob with spring easing (cubic-bezier(0.34, 1.56, 0.64, 1))
Responsive grid — 2-column dashboard on laptop, single column on tablet/mobile
Sticky header — Search bar always accessible while scrolling
Internal scroll — Hourly forecast scrolls within its container; page stays full-screen width
📄 License
This project is licensed under the MIT License — see the 
LICENSE
 file for details.

🙌 Acknowledgements
WeatherAPI.com for the weather data
Chart.js for the temperature visualization
Font Awesome for icons
Google Fonts for the Poppins typeface
Made with ❤️ · @DuyNguyen
