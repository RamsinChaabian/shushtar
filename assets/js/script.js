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
  

//Weather

document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=shushtar,ir&APPID=029a87c28964f9d5c30f9840196cd747')
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Network response was not ok.');
      }
  })
  .then(data => {
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
      const feelsLikeKelvin = data.main.feels_like;
      const feelsLikeCelsius = feelsLikeKelvin - 273.15;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      document.querySelector('.temperature').innerHTML = 'Temperature: <span>' + temperatureCelsius.toFixed(2) + ' °C</span>';
      document.querySelector('.feels-like').innerHTML = 'Feels Like: <span>' + feelsLikeCelsius.toFixed(2) + ' °C</span>';
      document.querySelector('.pressure').innerHTML = 'Pressure: <span>' + pressure + ' hPa</span>';
      document.querySelector('.humidity').innerHTML = 'Humidity: <span>' + humidity + '%</span>';
      document.querySelector('.wind-speed').innerHTML = 'Wind Speed: <span>' + windSpeed + ' m/s</span>';
      document.querySelector('.description').innerHTML = 'Description: <span>' + description + '</span>';
      document.querySelector('.weathericon').innerHTML = '<img src="https://openweathermap.org/img/wn/' + icon + '.png" alt="Weather Icon">';
      
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error.message);
  });
});

window.onload = function() {
  const weatherNews = document.getElementById('weatherNews');

  weatherNews.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });

  weatherNews.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
};


//Time

function fetchTehranTime() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://worldtimeapi.org/api/timezone/Asia/Tehran', true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              const tehranTimeElement = document.getElementById('tehrantime');
              const tehranTime = new Date(data.datetime);
              const formattedTime = tehranTime.toLocaleTimeString();
              const formattedDate = tehranTime.toDateString();
              tehranTimeElement.textContent = formattedTime + ' - ' + formattedDate;
          } else {
              console.error('خطا در دریافت اطلاعات:', xhr.statusText);
          }
      }
  };
  xhr.send();
}

fetchTehranTime();
setInterval(fetchTehranTime, 1000);

