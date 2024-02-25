 // Function to fetch language data
  async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
  }
  
  // Function to set the language preference
  function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }
  
  // Function to update content based on selected language
  function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = langData[key];
    });
  }
  
  // Function to change language
  async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);

    //
    toggleArabicStylesheet(lang);// Toggle Arabic stylesheet
  }

// Function to toggle Arabic stylesheet based on language selection
function toggleArabicStylesheet(lang) {
    const head = document.querySelector('head');
    const link = document.querySelector('#styles-link');
  
    if (link) {
      head.removeChild(link); // Remove the old stylesheet link
    }
    else if (lang === 'ar') {
        const newLink = document.createElement('link');
        newLink.id = 'styles-link';
        newLink.rel = 'stylesheet';
        newLink.href = './assets/css/style-ar.css'; // Path to Arabic stylesheet
        head.appendChild(newLink);
      }
  }
  
  
  // Call updateContent() on page load
  window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    toggleArabicStylesheet(userPreferredLanguage);
  });
  
//Get Shushtar Weather
  document.addEventListener('DOMContentLoaded', async function() {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=shushtar,ir&APPID=029a87c28964f9d5c30f9840196cd747');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
      const feelsLikeKelvin = data.main.feels_like;
      const feelsLikeCelsius = feelsLikeKelvin - 273.15;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const icon = data.weather[0].icon;
  
      const temperatureSpan = '<span class="fw-bold">' + temperatureCelsius.toFixed(2) + '</span>';
      const feelsLikeSpan = '<span>' + feelsLikeCelsius.toFixed(2) + '</span>';
  
      document.querySelector('.temperature').innerHTML = temperatureSpan;
      document.querySelector('.feels-like').innerHTML = feelsLikeSpan;
  
      const bodyDirection = getComputedStyle(document.body).direction;
      document.querySelector('.temperature').classList.add(bodyDirection);
      document.querySelector('.feels-like').classList.add(bodyDirection);
      
      document.querySelector('.pressure').innerHTML = '<span>' + pressure + ' hPa</span>';
      document.querySelector('.humidity').innerHTML = '<span>' + humidity + '%</span>';
      document.querySelector('.wind-speed').innerHTML = '<span>' + windSpeed + ' m/s</span>';
      document.querySelector('.weathericon').innerHTML = '<img src="https://openweathermap.org/img/wn/' + icon + '.png" alt="Weather Icon">';
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  });
  //Pause Animation
  window.onload = function() {
    const weatherNews = document.getElementById('weatherNews');
  
    weatherNews.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
  
    weatherNews.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  };
  // Get Tehran Time 
  async function fetchTehranTime() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Tehran');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      const tehranTimeElement = document.getElementById('tehrantime');
      const tehranTime = new Date(data.datetime);
      const formattedTime = tehranTime.toLocaleTimeString();
      const formattedDate = tehranTime.toDateString();
      tehranTimeElement.textContent = formattedTime + ' - ' + formattedDate;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  fetchTehranTime();
  setInterval(fetchTehranTime, 1000);