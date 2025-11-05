    const apiKey = "a7ea031576be49ba557146d2491da482"; // ⚠️ thay bằng API key OpenWeather của bạn

    async function getWeatherByCoords(lat, lon, lang = "en") {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${lang}`;
    const res = await fetch(url);
    const data = await res.json();
    showWeather(data);
        }

    async function getWeatherByCity(city, lang = "en") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;
    const res = await fetch(url);
    const data = await res.json();
    showWeather(data);
        }

    function showWeather(data) {
            if (data.cod !== 200) {
        alert("City not found!");
    return;
            }
    const countryCode = data.sys.country;
    const countryName = countries[countryCode] || countryCode;

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("city-location").textContent =
    `${data.name},  ${countryName}`;
    document.getElementById("temperature").textContent =
    `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;
    document.getElementById("description").textContent =
    data.weather[0].description;

    // 🟡 Thêm icon thời tiết
    const icon = document.getElementById("weather-icon");
    const weatherType = data.weather[0].main.toLowerCase();

    // Sử dụng icon tùy chỉnh
    if (weatherType.includes("rain")) {
        icon.src = "/Image/rain.png"; // icon mưa của bạn
            } else if (weatherType.includes("clear")) {
        icon.src = "/Image/sunlight.png";  // icon bạn vừa gửi
            } else if (weatherType.includes("cloud")) {
        icon.src = "/Image/overcast.png"; // icon mây
            } else if (weatherType.includes("snow")) {
        icon.src = "/Image/hail.png";  // icon tuyết
            } else if (weatherType.includes("storm")) {
        icon.src = "/Image/storm.png"; // icon sấm
            } else {
        icon.src = "/Image/cloudy.png"; // icon mặc định
            }

    document.getElementById("weather-box").style.display = "block";
    updateBackground(data.weather[0].main.toLowerCase());

    // 🌄 Xử lý hiển thị icon góc
    const sunrise = data.sys.sunrise * 1000; // thời gian (ms)
    const sunset = data.sys.sunset * 1000;
    const now = Date.now();

            const isDay = now > sunrise && now < sunset; 

            // Ẩn tất cả trước
            ["icon-sunrise", "icon-day", "icon-sunset", "icon-night"].forEach(id => {
        document.getElementById(id).classList.add("hidden");
            });

    // Hiển thị icon tương ứng
    if (now < sunrise) {
        document.getElementById("icon-night").classList.remove("hidden");
            } else if (now >= sunrise && now < sunrise + 2 * 60 * 60 * 1000) { // 2h đầu sau bình minh
        document.getElementById("icon-sunrise").classList.remove("hidden");
            } else if (now >= sunrise + 2 * 60 * 60 * 1000 && now < sunset - 2 * 60 * 60 * 1000) {
        document.getElementById("icon-day").classList.remove("hidden");
            } else if (now >= sunset - 2 * 60 * 60 * 1000 && now < sunset) {
        document.getElementById("icon-sunset").classList.remove("hidden");
            } else {
        document.getElementById("icon-night").classList.remove("hidden");
            }
        }

    function updateBackground(weather) {
            const bg = document.querySelector('.weather-bg');
    bg.className = 'weather-bg'; // reset class
    //let gifUrl = "";
    let gradient = "";

    if (weather.includes("clear")) {
        // trời nắng
        //gifUrl = "url('https://vnshort.com/jK5i')";
        gradient = "linear-gradient(to bottom, #f9d423, #ff4e50)";
            } else if (weather.includes("cloud")) {
        // có mây
        //gifUrl = "url('https://vnshort.com/jK5i')";
        gradient = "linear-gradient(to bottom, #757f9a, #d7dde8)";
            } else if (weather.includes("rain")) {
        // mưa
        //gifUrl = "url('https://vnshort.com/94rK')";
        gradient = "linear-gradient(to bottom, #4e54c8, #8f94fb)";
            } else if (weather.includes("thunderstorm")) {
        // giông
        //gifUrl = "url('https://vnshort.com/jK5i')";
        gradient = "linear-gradient(to bottom, #232526, #414345)";
            } else if (weather.includes("snow")) {
        // tuyết
        //gifUrl = "url('https://vnshort.com/jK5i')";
        gradient = "linear-gradient(to bottom, #83a4d4, #b6fbff)";
            } else if (weather.includes("mist") || weather.includes("fog")) {
        // sương mù
        //gifUrl = "url('https://vnshort.com/jK5i')";
        gradient = "linear-gradient(to bottom, #606c88, #3f4c6b)";
            } else if (weather.includes("night")) {
        // ban đêm
        //gifUrl = "url('https://vnshort.com/jK5i')";
        gradient = "linear-gradient(to bottom, #141E30, #243B55)";
            } else {
        // mặc định
        //gifUrl = "url('https://vnshort.com/jK5i')";
        gradient = "linear-gradient(to bottom, #2980b9, #6dd5fa)";
            }

    bg.style.background = gradient;
            //bg.style.backgroundImage = gifUrl;
            //bg.style.backgroundSize = "cover";
            //bg.style.backgroundPosition = "center";
            //bg.style.backgroundRepeat = "no-repeat";
        }

    const countries = {
        "VN": "Vietnam",
    "US": "United States",
    "FR": "France",
    "JP": "Japan",
    "CN": "China",
    "GB": "United Kingdom",
            // thêm các quốc gia khác
        };

        // 🌍 Lấy vị trí hiện tại
        window.onload = () => {
        document.getElementById("loading-screen").style.display = "flex";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude } = pos.coords;
                getWeatherByCoords(latitude, longitude);
                document.getElementById("loading-screen").style.display = "none";
            },
            err => {
                getWeatherByCity("Ho Chi Minh City");
                document.getElementById("loading-screen").style.display = "none";
            }
        );
            } else {
        getWeatherByCity("Ho Chi Minh City");
    document.getElementById("loading-screen").style.display = "none";
            }
        };


        // 🔍 Tìm kiếm thành phố
        document.getElementById("searchBtn").addEventListener("click", () => {
            const city = document.getElementById("cityInput").value;
    const lang = document.getElementById("language").value;
    if (city) {
        getWeatherByCity(city, lang);
    toggleSidebar(); // đóng sidebar sau khi tìm
            }
        });

        // 🌐 Đổi ngôn ngữ
        document.getElementById("language").addEventListener("change", () => {
            const lang = document.getElementById("language").value;
    const city = document.getElementById("city-name").textContent || "Ho Chi Minh City";
    getWeatherByCity(city, lang);
        });

    function toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".menu-btn");
    const overlay = document.getElementById("overlay");
    sidebar.classList.toggle("active");
    menuBtn.classList.toggle("active");

    if (sidebar.classList.contains("active")) {
        overlay.style.display = "block"; // hiện overlay
    document.body.classList.add("sidebar-open"); // mờ nền chính
            } else {
        overlay.style.display = "none"; // ẩn overlay
    document.body.classList.remove("sidebar-open"); // bỏ mờ nền
            }
        }

        // Click vào overlay cũng đóng sidebar
        document.getElementById("overlay").addEventListener("click", () => {
        toggleSidebar();
        });

    function searchFromSidebar() {
            const city = document.getElementById("sidebarCity").value;
    const lang = document.getElementById("language").value;
    if (city) {
        getWeatherByCity(city, lang);
    toggleSidebar(); // đóng sidebar sau khi tìm
            }
        }

    function updateClock() {
            const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
        }

    setInterval(updateClock, 1000);
    updateClock();

