🌤 Weather Forecast App
A modern, full-stack weather forecast web application built with Spring Boot and Vanilla JavaScript. Get real-time weather data, 7-day forecasts, hourly temperature charts, and air quality metrics for any city worldwide.

JavaSpring BootJavaScriptWeatherAPILicense

📸 Preview
<img width="1901" height="911" alt="Screenshot 2026-08-15 015642" src="https://github.com/user-attachments/assets/2ca55d81-d23e-4508-bea0-7bba7a45913d" />


Light Mode	Dark Mode
Light	Dark
✨ Features
🔍 City Search — Search weather for any city with autocomplete suggestions
📍 My Location — One-click geolocation weather detection
🌡️ Current Weather — Temperature, humidity, wind speed, feels like, visibility, pressure, UV index
📅 7-Day Forecast — Daily high/low temperatures with weather icons
⏱️ Hourly Forecast — Today's hour-by-hour weather with rain probability
📊 24-Hour Temperature Chart — Interactive line chart powered by Chart.js
🌫️ Air Quality Index — PM2.5, PM10, CO, NO₂, O₃, SO₂ readings
⭐ Favorite Cities — Save and quickly access your favorite locations
🌡️ °C / °F Toggle — Switch between Celsius and Fahrenheit instantly
🌙 Dark / Light Mode — Smooth animated toggle switch with persistence
📱 Fully Responsive — Optimized for all devices (mobile, tablet, iPad, laptop, desktop)
🛠️ Tech Stack
Frontend
Technology	Purpose
HTML5 / CSS3	Structure & Styling
Vanilla JavaScript (ES6+)	Client-side logic, DOM, LocalStorage
Chart.js	24-hour temperature chart
Font Awesome 6	Icons
Google Fonts — Poppins	Typography
Backend
Technology	Purpose
Java 17+	Core language
Spring Boot 3.x	Web framework, REST API
Spring Web	HTTP request handling
Maven	Dependency management
External API
Service	Usage
WeatherAPI.com	Current weather, forecasts, air quality
📁 Project Structure

weatherapp/
├── src/
│   └── main/
│       ├── java/
│       │   └── weatherapp/
│       │       ├── config/
│       │       │   └── RestClientConfig.java        # RestClient / WebClient configuration
│       │       ├── controller/
│       │       │   ├── FavouriteController.java     # Favorite cities CRUD endpoints
│       │       │   ├── HomeController.java          # Home / view routing
│       │       │   └── WeatherController.java       # Weather forecast REST API
│       │       ├── dto/
│       │       │   ├── AirQuality.java              # Air quality data model
│       │       │   ├── Condition.java               # Weather condition details
│       │       │   ├── Current.java                 # Current weather metrics
│       │       │   ├── Day.java                     # Daily forecast metrics
│       │       │   ├── Forecast.java                # Forecast container
│       │       │   ├── ForecastDay.java             # Daily forecast item
│       │       │   ├── Hour.java                    # Hourly data item
│       │       │   ├── Location.java                # Geolocation info
│       │       │   └── WeatherResponse.java         # Root WeatherAPI response mapping
│       │       ├── entity/
│       │       │   └── City.java                    # JPA Entity for favorite cities
│       │       ├── responsitory/
│       │       │   └── CityRepository.java          # Spring Data JPA Repository
│       │       ├── service/
│       │       │   └── WeatherService.java          # WeatherAPI integration & business logic
│       │       └── WeatherappApplication.java       # Spring Boot main application entry
│       └── resources/
│           ├── application.properties               # App configuration & Database setup
│           └── static/
│               ├── index.html                       # Single Page Application UI
│               ├── weather.png                      # App favicon
│               ├── css/
│               │   ├── style.css                    # Base theme variables, header & layout
│               │   ├── current.css                  # Hero current weather card & AQI
│               │   ├── forecast.css                 # 7-day forecast sidebar styling
│               │   ├── hourly.css                   # Hourly forecast horizontal carousel
│               │   ├── chart.css                    # 24-hour temperature chart
│               │   └── responsive.css               # Responsive design for mobile & tablet
│               └── js/
│                   ├── script.js                    # UI interactions, theme & event handling
│                   └── weather.js                   # API communication & DOM rendering
├── Dockerfile                                       # Containerization for cloud deployment
├── pom.xml                                          # Maven dependencies (Spring Boot, H2, JPA)
├── .env.example                                     # Environment variable template
├── .gitignore                                       # Git ignore configuration
└── README.md
🚀 Getting Started
Prerequisites
Java 17+ — Download JDK
Maven 3.8+ — Download Maven
WeatherAPI Key — Get free key (free tier: 1M calls/month)
1. Clone the Repository
bash

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

server.port=8080
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
