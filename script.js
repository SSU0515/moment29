const quoteURL = "http://dummyjson.com/quotes";
const quoteBtn = document.querySelector(".quoteBtn");
const clockPlace = document.querySelector(".container h1");

window.onload = () => {
  const bgCount = 7;
  const randomNumber = Math.ceil(Math.random() * bgCount);
  document.body.style.backgroundImage = `url(./image/${randomNumber}.jpg)`;
};

const quoteload = () => {
  fetch(quoteURL)
    .then((response) => response.json())
    .then((data) => {
      const result = document.querySelector("#result");
      const random = Math.floor(Math.random() * 30);
      result.querySelector(".quote").innerText = data.quotes[random].quote;
      result.querySelector(".author").innerText = data.quotes[random].author;
    });
};

quoteBtn.addEventListener("click", () => {
  quoteload(quoteURL);
});

quoteload();

function updateClock() {
  const now = new Date();

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayIndex = now.getDay();
  const dayName = week[dayIndex];

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const currentDate = `${year}년 ${month}월 ${date}일 
  <span>${dayName}요일</span> `;
  const currentTime = `${hours}시 ${minutes}분 ${seconds}초`;
  document.querySelector(
    ".clock"
  ).innerHTML = `<h1>${currentDate}</h1> <h2>${currentTime}</h2>`;
}

// Initial call to display the clock immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);

// import { API_KEY } from "./env.js";
const getCurrentWeather = (latitude, longitude) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2a69d5ae32b5f5c4fac10c49589b9dd0&units=metric&lang=kr`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector(".city");
      const weather = document.querySelector(".weather");
      const temp = document.querySelector(".temp");
      city.innerText = data.name;
      weather.innerText = data.weather[0].description;
      temp.innerText = `${data.main.temp}°C`;
    })
    .catch((error) => {
      console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
      const noti = document.querySelector(".noti");
      noti.style.display = "block";
    });
};

const getPosition = (position) => {
  const { latitude, longitude } = position.coords;
  getCurrentWeather(latitude, longitude);
};

const errorHandler = () => {
  const noti = document.querySelector(".noti");
  noti.style.display = "block";
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition, errorHandler);
} else {
  alert("위치 정보 사용이 불가능합니다.");
}
