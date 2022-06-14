const inputWord= document.querySelector(".top-banner input");
const cityForm=document.querySelector(".top-banner form")
const messageCity = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const submitBtn= document.querySelector(".submitButton");
const apiKey= "6074446325042a7eaf05b7bf76ae58e0";
cityForm.addEventListener("submit",element => {
    element.preventDefault();
    let inputValue=inputWord.value;

    const cityList=list.querySelectorAll(".ajax-section .city")
    const cityListArray = Array.from(cityList);

    if (cityListArray.length > 0) {
        const filteredArray = cityListArray.filter(el => {
          let content = "";
          if (inputValue.includes(",")) {
            if (inputValue.split(",")[1].length > 2) {
                inputValue = inputValue.split(",")[0];
              content = el
                .querySelector(".city-name span")
                .textContent.toLowerCase();
            } else {
              content = el.querySelector(".city-name").dataset.name.toLowerCase();
            }
          } else {
            content = el.querySelector(".city-name span").textContent.toLowerCase();
          }
          return content == inputValue.toLowerCase();
        });
    

    if (filteredArray.length > 0) {
        messageCity.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      cityForm.reset();
      inputWord.focus();
      return;
    }}
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
          weather[0]["icon"]
        }.svg`;
  
        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
          <figure>
            <img class="city-icon" src="${icon}" alt="${
          weather[0]["description"]
        }">
            <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
        `;
        li.innerHTML = markup;
        list.appendChild(li);
      })
      .catch(() => {
        messageCity.textContent = "Please search for a valid city 😩";
      });
  
    messageCity.textContent = "";
    cityForm.reset();
    inputWord.focus();
    });