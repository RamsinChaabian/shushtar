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
  toggleArabicStylesheet(lang);// Toggle Arabic stylesheet

}

// Function to toggle Arabic stylesheet based on language selection
function toggleArabicStylesheet(lang) {
  const head = document.querySelector('head');
  const link = document.querySelector('#styles-link');

  if (link) {
    head.removeChild(link); // Remove the old stylesheet link
  }
  else if (lang === 'ar' ||lang ==="fa") {
    const newLink = document.createElement('link');
    newLink.id = 'styles-link';
    newLink.rel = 'stylesheet';
    newLink.href = './assets/css/style-ar.css'; // Path to Arabic stylesheet
    head.appendChild(newLink);

    var images = document.querySelectorAll('img.rounded-end-4');
    images.forEach(function (image) {
      image.classList.remove('rounded-end-4');
    });

  }
}


// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {

  await GetWeatherNews();

  // Call the function to get and display weather forecast when the popup is opened
  var popupElement = document.getElementById("weatherPopup");
  if (popupElement) {
    await getWeatherForecast();
  }

  const userPreferredLanguage = localStorage.getItem('language') || 'en';
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  toggleArabicStylesheet(userPreferredLanguage);

  if (document.documentElement.lang === 'ar') {
    const head = document.querySelector('head');
    const link = document.querySelector('#styles-link');

    if (!link) {
      const newLink = document.createElement('link');
      newLink.id = 'styles-link';
      newLink.rel = 'stylesheet';
      newLink.href = './assets/css/style-ar.css';
      head.appendChild(newLink);
      document.querySelectorAll('img.rounded-end-4').forEach(image => {
        image.classList.remove('rounded-end-4');
      });
    }
  }

});

//Get Shushtar Weather
async function GetWeatherNews() {
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

    const temperatureSpan = '<span>' + temperatureCelsius.toFixed(0) + '</span>';
    const feelsLikeSpan = '<span>' + feelsLikeCelsius.toFixed(0) + '</span>';
    const pressureSpan = '<span>' + pressure + '</span>';
    const humiditySpan = '<span>' + humidity + '</span>';
    const windspeed_Span = '<span>' + windSpeed.toFixed(1) + '</span>';

    document.querySelector('.temperature').innerHTML = temperatureSpan;
    document.querySelector('.feels-like').innerHTML = feelsLikeSpan;
    document.querySelector('.pressure').innerHTML = pressureSpan;
    document.querySelector('.humidity').innerHTML = humiditySpan;
    document.querySelector('.wind-speed').innerHTML = windspeed_Span;

    const bodyDirection = getComputedStyle(document.body).direction;
    document.querySelector('.temperature').classList.add(bodyDirection);
    document.querySelector('.feels-like').classList.add(bodyDirection);
    document.querySelector('.pressure').classList.add(bodyDirection);
    document.querySelector('.humidity').classList.add(bodyDirection);
    document.querySelector('.wind-speed').classList.add(bodyDirection);

    document.querySelector('.weathericon').innerHTML = '<img height="75" width="75" src="https://openweathermap.org/img/wn/' + icon + '@2x.png" alt="Weather Icon">';
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error.message);
  }
}

//Get Shushtar Weather Forecast
async function getWeatherForecast() {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=shushtar,ir&APPID=029a87c28964f9d5c30f9840196cd747');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    const forecasts = data.list;

    const modalBody = document.querySelector('.modal-body');
    let tableHTML = `
        <div class="table-responsive">
        <table class="table table-striped text-center table-success" style="font-size: smaller;max-height: 200px;overflow: auto;display:inline-block;">
            <thead>
                <tr>
                    <th data-i18n="date"></th>
                    <th data-i18n="temperature"></th>
                    <th data-i18n="status"></th>
                    <th data-i18n="feels_like"></th>
                </tr>
            </thead>
            <tbody>
    `;
    forecasts.forEach(forecast => {
      let date = forecast.dt_txt;
      const bodyDirection = getComputedStyle(document.body).direction;

      const [datePart, timePart] = date.split(' ');
      const [year, month, day] = datePart.split('-');
      const [hour, minute, second] = timePart.split(':');

      let textStyle = "";
      if (bodyDirection === "ltr") {
        date = new Date(year, month - 1, day, hour, minute, second);
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' });
        date = dateTimeFormat.format(date);
        console.log(date);
        textStyle = "text-start";
      } else if (bodyDirection === "rtl") {
        date = new Date(year, month - 1, day, hour, minute, second);
        const dateTimeFormat = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full', timeStyle: 'short' });
        date = dateTimeFormat.format(date);
        console.log(date);
        textStyle = "text-end";
      }
      const temperatureKelvin = forecast.main.temp;
      const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
      const feelsLikeKelvin = forecast.main.feels_like;
      const feelsLikeCelsius = feelsLikeKelvin - 273.15;
      const icon = forecast.weather[0].icon;

      tableHTML += `
                <tr>
                    <td class="${textStyle}">${date}</td>
                    <td dir="ltr"><span class="fw-bold">${temperatureCelsius.toFixed(0)}</span><span class="fw-bold">&#8451;</span></td>
                    <td><img loading="lazy" style="width: 100%;object-fit: none;" height="75" width="75" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon"></td>
                    <td dir="ltr"><span class="fw-bold">${feelsLikeCelsius.toFixed(0)}</span><span class="fw-bold">&#8451;</span></td>
                </tr>
            `;

    });

    tableHTML += `
                </tbody>
            </table>
            </div>`;
    modalBody.innerHTML = tableHTML;

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error.message);
  }
}

//Pause Animation
window.onload = function () {
  const weatherNews = document.getElementById('weatherNews');

  weatherNews.addEventListener('mouseenter', function () {
    this.style.animationPlayState = 'paused';
  });

  weatherNews.addEventListener('mouseleave', function () {
    this.style.animationPlayState = 'running';
  });
};

// Get Tehran Time 
async function fetchTehranTime() {
  let success = false;
  while (!success) {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Tehran');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      const tehranTimeElement = document.getElementById('tehrantime');
      const tehranTime = new Date(data.datetime);
      const bodyDirection = getComputedStyle(document.body).direction;

      let dateTimeFormat;
      if (bodyDirection === "ltr") {
        dateTimeFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'full' });
      } else if (bodyDirection === "rtl") {
        dateTimeFormat = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full', timeStyle: 'full' });
      }

      setInterval(() => {
        tehranTimeElement.textContent = dateTimeFormat.format(tehranTime);
        tehranTime.setSeconds(tehranTime.getSeconds() + 1);
      }, 1000);

      success = true;
    } catch (error) {
      console.error('Error:', error.message);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

fetchTehranTime();
