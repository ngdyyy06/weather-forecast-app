let temperatureChart = null; // lưu biểu đồ hiện tại -> k bị chồng biểu đồ sau mỗi lần tìm city mới

let currentUnit = "C";
let lastWeatherData = null;

let currentCity = null;
let currentCityData = null;

const loading = document.getElementById("loading");  // giả lập loading đợi API

const errorMessage = document.getElementById("errorMessage");

function celsiusToFahrenheit(celsius) {  // hàm chuyển đổi từ C sang F
    return (celsius * 9/5) + 32;
}

function formatTemperature(celsius) {
    if (celsius === undefined || celsius === null) {
        return "--";
    }

    if (currentUnit === "F") {
        return celsiusToFahrenheit(celsius).toFixed(1) + " °F";
    }

    return celsius.toFixed(1) + " °C";
}

async function searchWeather(city) {
    hideError();

    loading.style.display = "flex";

    try {
        const response = await fetch("/weather?city=" + encodeURIComponent(city));   // Gửi request đến backend

        if (!response.ok) {
            showError("Can not find city. Please check city name again!");
            return;
        }

        const data = await response.json();  // Chuyển dự liệu từ Json thành Object JavaScript để xử lí

        console.log("Location name:", data.location.name);
        console.log("Country:", data.location.country);

        lastWeatherData = data;  // lastWeatherData sẽ giữ toàn bộ object API trả về.

        currentCityData = data;
        currentCity = city;

        console.log(data.forecast.forecastday[0]);

        const icon = document.getElementById("weatherIcon");
        icon.src = "https:" + data.current.condition.icon;
        icon.alt = data.current.condition.text;
        icon.style.display = "block";

        const air = data.current.air_quality;  // lấy nguyên object Air Quality trong API
        let statusClass = "";
        let status = "";
        const epaIndex = air["us-epa-index"];  // lấy chỉ số EPA từ API

        if (epaIndex === 1) {
            status = "Good";
            statusClass = "aqi-good";
        } else if (epaIndex === 2) {
            status = "Moderate";
            statusClass = "aqi-moderate";
        } else if (epaIndex === 3) {
            status = "Unhealthy for Sensitive Groups";
            statusClass = "aqi-sensitive";
        } else if (epaIndex === 4) {
            status = "Unhealthy";
            statusClass = "aqi-unhealthy";
        } else if (epaIndex === 5) {
            status = "Very Unhealthy";
            statusClass = "aqi-very-unhealthy";
        } else if (epaIndex === 6) {
            status = "Hazardous";
            statusClass = "aqi-hazardous";
        } else {
            status = "Unknown";
            statusClass = "";
        }

        const aqiStatus = document.getElementById("aqiStatus");

        aqiStatus.textContent = status;
        aqiStatus.className = "aqi-status " + statusClass;

        document.getElementById("cityName").textContent =
            data.location.name + ", " + data.location.country;

        document.getElementById("temperature").textContent =
            formatTemperature(data.current.temp_c);

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("humidity").textContent =
            data.current.humidity + "%";

        document.getElementById("wind").textContent =
            data.current.wind_kph + " km/h";

        document.getElementById("feelslike").textContent =
            formatTemperature(data.current.feelslike_c);

        document.getElementById("visibility").textContent =
            data.current.vis_km + " km";

        document.getElementById("pressure").textContent =
            data.current.pressure_mb + " mb";

        document.getElementById("uv").textContent =
            data.current.uv;

        document.getElementById("pm25").textContent =
            air.pm2_5;

        document.getElementById("pm10").textContent =
            air.pm10;

        document.getElementById("co").textContent =
            air.co;

        document.getElementById("no2").textContent =
            air.no2;

        document.getElementById("o3").textContent =
            air.o3;

        document.getElementById("so2").textContent =
            air.so2;

        console.log(data.current);
        console.log(data.forecast);
        console.log(data.forecast.forecastday);

        showForecast(data.forecast.forecastday);
        showHourly(data.forecast.forecastday[0].hour);
        showTemperatureChart(data.forecast.forecastday[0].hour);
    } catch (error) {
        console.error("Weather error: ", error);
        showError("Unable to load weather data. Please try again!");
    } finally {
        loading.style.display = "none";
    }
}


// hàm hiển thị thời tiết các ngày còn lại trong tuần
function showForecast(days) {
    const forecast = document.getElementById("forecast");
    forecast.innerHTML = "";

    days.forEach(item => {
        const date = new Date(item.date);
        let weekDay = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        const today = new Date().toISOString().split("T")[0];

        if (item.date === today) {
            weekDay = "Today";
        }

        forecast.innerHTML += `
            <div class="day-card">
                <h3>${weekDay}</h3>
                
                <img src="https:${item.day.condition.icon}"
                     alt="${item.day.condition.text}">
                     
                <p class="forecast-text">
                    ${item.day.condition.text}
                </p>
                
                <div class="temp-range">
                    <span class="max-temp">${formatTemperature(item.day.maxtemp_c)}</span>
                    <span class="min-temp">${formatTemperature(item.day.mintemp_c)}</span>
                </div>
            </div>
        `;
    });
}


// hàm hiển thị weather từng khung giờ trong ngày
function showHourly(hours) {
    const currentHour = new Date().getHours();

    console.log(hours[0]);

    const container = document.getElementById("hourlyForecast");
    container.innerHTML = "";
    hours.forEach(hour => {
        const hourNumber = parseInt(hour.time.split(" ")[1].substring(0,2));

        if(hourNumber < currentHour){
            return;
        }

        const hourText = hour.time.split(" ")[1].substring(0, 5);    // Lấy đến phần tử thứ 4 trong hourText
        let displayTime = hourText;

        if (parseInt(hourText.substring(0, 2)) === currentHour) {
            displayTime = "Now";
        }

        container.innerHTML += `
        <div class="hour-card ${displayTime === "Now" ? "active-hour" : ""}">
        <div class="hour-time">${displayTime}</div>
        
        <img src="https:${hour.condition.icon}" alt="${hour.condition.text}">
        
        <div class="hour-temp">
            ${formatTemperature(hour.temp_c)}
        </div>
        
        <div class="rain">
    <i class="fa-solid fa-droplet"></i>
    <span>
        <small>Rain chance</small>
        <strong>${hour.chance_of_rain}%</strong>
    </span>
</div>
        </div>
        `;
    });
}


// hàm hiển thị biểu đồ nhiệt độ
function showTemperatureChart(hours) {
    const labels = [];   // trục X -> thoi gian
    const temperature = [];  // dữ liệu nhiệt độ

    hours.forEach(hour => {
        const time = hour.time.split(" ")[1].substring(0, 5);  // lấy 5 kí tu đầu của giờ

        labels.push(time);
        temperature.push(hour.temp_c);
    });

    const ctx = document.getElementById("temperatureChart");  // lấy vị trí canvas để vẽ biểu đồ

    if (temperatureChart !== null) {  // nếu đã có chart, tìm thêm thành phố mới sẽ xoa chart cũ
        temperatureChart.destroy();  // xoá chart cũ
    }

    temperatureChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,

            datasets: [{
                label: "Temperature",
                data:temperature,
                pointRadius: 4,  // kích thuoc các điểm trên đường biểu đồ
                pointHoverRadius: 7,  // khi rê chuột vào 1 điểm sẽ phóng to
                // tension: 0.4,   // điều chỉnh độ cong mượt của biểu đồ
                fill: true
            }]
        },

        options: {
            responsive: true,  // cho phép biểu đồ tự điều chỉnh kích thuoc theo màn hình
            maintainAspectRatio: false,  // cho phép css quyết định chiều cao

            plugins: {
                legend: {
                    display: false,  // tắt phần chú thích vì Temperature Trend đã đủ rõ
                }
            },

            tooltip: {   // khi rê chuột vào 1 điểm, thay vi dữ liệu thô, sẽ hiện dữ liệu dễ đọc hơn
                callbacks: {
                    labels: function (context) {
                        const temp = currentUnit === "F"
                        ? celsiusToFahrenheit(context.parsed.y)
                            : context.parsed.y;

                        return temp.toFixed(1) + " °" + currentUnit;
                    }
                }
            },

            scales: {
                x: {   // trục ngang là time
                    title: {
                        display: true,
                        text: "Time"
                    }
                },

                y: {  // trục dọc la temperature
                    beginAtZero: false,  // trục Y (không bắt đầu từ nhiệt độ 0)

                    title: {
                        display: true,
                        text: `Temperature (°${currentUnit})`
                    }
                }
            }
        }
    })
}

//
function updateTemperatureDisplay(data) {
    // current temperature
    document.getElementById("temperature").textContent = formatTemperature(data.current.temp_c);

    // feels like
    document.getElementById("feelslike").textContent = formatTemperature(data.current.feelslike_c);

    // 7 days
    if (data.forecast && data.forecast.forecastday) {
        showForecast(data.forecast.forecastday);
    }

    // hourly
    if (data.forecast && data.forecast.forecastday) {
        const today = data.forecast.forecastday[0];

        if (today.hour) {
            showHourly(today.hour);
        }
    }
}


// chuyển đội độ C -> F
document.getElementById("celsiusBtn").addEventListener("click", () => {
    currentUnit = "C";

    document.getElementById("celsiusBtn").classList.add("active");
    document.getElementById("fahrenheitBtn").classList.remove("active");

    if (lastWeatherData) {
        updateTemperatureDisplay(lastWeatherData);
    }
});

// chuyển đổi độ F -> C
document.getElementById("fahrenheitBtn").addEventListener("click", () => {
    currentUnit = "F";

    document.getElementById("fahrenheitBtn").classList.add("active");
    document.getElementById("celsiusBtn").classList.remove("active");

    if (lastWeatherData) {
        updateTemperatureDisplay(lastWeatherData);

    }
});


// hàm nút thêm city vào mục yêu thích -> lưu vào mysql
document.getElementById("favoriteBtn").addEventListener("click", async () => {
    if (!currentCityData) {
        return;
    }

    const location = currentCityData.location;

    const response = await fetch("/favorite", {

        // lấy dưới dạng JSON
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: location.name,
            country: location.country,
            latitude: location.lat,
            longitude: location.lon
        })
    });

    if (response.ok) {
        showToast("Added to favourite ⭐");
        await loadFavorites();
    }
});


// hàm load mục yêu thích
async function loadFavorites() {
    const response = await fetch("/favorite");

    if (!response.ok) {
        console.error("Can not load favorites");
        return;
    }

    const favorites = await response.json();
    const favoritesList = document.getElementById("favoriteList");
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = `
        <div class="favorite-empty">
            <div class="favorite-empty-icon">⭐</div>
            <h3>No favorite cities yet</h3>
            <p>Search for a city and add it to your favorites.</p>
        </div>
    `;

        return;
    }

    favorites.forEach(city => {
        const card = document.createElement("div");
        card.className = "favorite-card";

        card.innerHTML = `
    <div class="favorite-info">
        <h3>⭐ ${city.name}</h3>
        <p>${city.country}</p>
    </div>

    <button class="delete-favorite" title="Remove favorite">
        <i class="fa-solid fa-trash"></i>
    </button>
    `;

        const deleteButton = card.querySelector(".delete-favorite");

        deleteButton.addEventListener("click", async (e) => {
            e.stopPropagation();  // chặn sự kiện xem thời tiết không truyền tiếp lên card

            const confirmDelete = await showConfirm(`Are you sure you want to delete ${city.name} from your favorite?`);

            if (!confirmDelete) {
                return;
            }

            const response = await fetch(`/favorite/${city.id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                await loadFavorites();  // favor hiển thị luon k cần reload trang
            }
        });

        card.addEventListener("click", () => {
            searchWeather(city.name);
        })

        favoritesList.appendChild(card);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
});


// nút lấy vị tri hiện tại của user
document.getElementById("locationBtn").addEventListener("click", () => {
    if (!navigator.geolocation) {
        showToast("Your browser does not support location!");
        return;
    }

    // Browser xin quyền (Allow/Block)
    navigator.geolocation.getCurrentPosition(async (position) => {

        // Lấy toạ độ vị trí
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitude: ", latitude);
        console.log("Longitude: ", longitude);

        await searchWeather(`${latitude},${longitude}`);  // API lấy toạ độ và trả về city
    },
        (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                showToast("Please allow location access!");
            } else {
                showToast("Can not get your location!");
            }
        });
});


// dự đoán tìm kiếm / gợi ý tìm kiếm
const cityInput = document.getElementById("city");  // lưu dữ lieu city rồi cho vào cityInput
const suggestions = document.getElementById("suggestions");

cityInput.addEventListener("input", async () => {  // bắt từng sự kiện gõ từng chữ cái
    const city = cityInput.value.trim().toLowerCase();  // lấy nội dung user đang nhập

    // k có nội dung thì ẩn suggest
    if (city === "") {
        suggestions.innerHTML = "";
        return;
    }

    try {
        const response = await fetch("/suggest?city=" + encodeURIComponent(city));  // gọi API backend

        if (!response.ok) {  // kiểm tra có thành công không
            return;
        }

        const cities = await response.json()  // chuyển json thành javaScript
        suggestions.innerHTML = "";  // nếu user nhập thêm kí tự hay xoá bớt kí tự thì suggest phải xoá list cũ, tạo list mới
        cities.forEach(city => {
            const item = document.createElement("div");

            item.className = "suggestion-item";
            item.innerHTML = `
            📍 ${city.name}, ${city.country}
            `;

            item.addEventListener("click", async () => {  // bắt sự kiện user click vào tên city trong list
                cityInput.value = city.name;  // đưa city vào search -> search như bth
                suggestions.innerHTML = "";  // tìm rồi thì xoá list suggest
                await searchWeather(city.name);
                cityInput.value = "";
            });

            suggestions.appendChild(item);
        });
    } catch (error) {
        console.log("Can not find suggestions: ", error);
    }
})

// đóng suggestion khi click ra ngoài
document.addEventListener("click", (e) => {
    if (!cityInput.contains(e.target) && !suggestions.contains(e.target)) {

        suggestions.innerHTML = "";
    }
});

// hiện lỗi khi nhập linh tinh
function showError(message) {
    errorMessage.textContent = "❌ " + message;
    errorMessage.style.display = "block";
}

function hideError() {
    errorMessage.style.display = "none";
}


// thay đổi dark / light mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");  // nếu chưa có thì thêm vào, co rồi thì xoá đi

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


// thông báo rieng cho web
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// confirm delete
function showConfirm(message) {
    return new Promise(resolve => {
        const confirm = document.getElementById("confirm");
        const confirmText = confirm.querySelector("p");

        confirmText.textContent = message;
        confirm.classList.add("show");  // hiện thông báo xác nhận

        const cancelBtn = document.getElementById("confirmCancel");
        const deleteBtn = document.getElementById("confirmDelete");

        function close(result) {
            confirm.classList.remove("show");

            // xoá event sau khi click, tránh bị bấm nhiều lần -> chạy nhiều lần
            confirm.removeEventListener("click", cancel);
            deleteBtn.removeEventListener("click", deletee);

            resolve(result);
        }

        // đóng xác nhận
        function cancel() {
            close(false);
        }

        function deletee() {
            close(true);
        }

        // đăng kí sự kiện cho 2 nút
        cancelBtn.addEventListener("click", cancel);
        deleteBtn.addEventListener("click", deletee);
    })
}

