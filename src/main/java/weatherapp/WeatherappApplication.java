package weatherapp;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WeatherappApplication {

	public static void main(String[] args) {
//		Dotenv dotenv = Dotenv.configure()
//						.ignoreIfMissing()
//								.load();
//
//		System.setProperty("WEATHER_API_KEY", dotenv.get("WEATHER_API_KEY"));

		SpringApplication.run(WeatherappApplication.class, args);
	}

}
