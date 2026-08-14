console.log("JS Loaded");

const form = document.getElementById("weatherForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const city = document.getElementById("city").value;

    if(city.trim() === ""){          // Nếu chưa nhập city thì return
        return;
    }
    await searchWeather(city);       // Đợi form bắt sự kiện Submit thì searchWeather thực hiện

    document.getElementById("city").value = "";
});