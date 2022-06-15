const inputWord=document.querySelector(".cityInput");
const cityForm=document.querySelector("form");
const cautionMessage=document.querySelector(".msg");
const cityList=document.querySelector(".cities");
const cityName=document.querySelector(".city-name");
const apiKey= "6074446325042a7eaf05b7bf76ae58e0";
//submit Section-- every event is in the section
cityForm.addEventListener('submit',element=>{
    element.preventDefault();
    let inputValue=inputWord.value;
    const listedCities=cityList.querySelectorAll(".ajax-section .city")
    const citiesArray= Array.from(listedCities);
    if (citiesArray.length > 0) {
        const filtering = citiesArray.filter(elemt => {
            let content = "";
            if (inputValue.includes(",")) {
              if (inputValue.split(",")[1].length > 2) {
                  inputValue = inputValue.split(",")[0];
                content = elemt
                  .querySelector(".city-name span")
                  .textContent.toLowerCase();
              } else {
                content = elemt.querySelector(".city-name").dataset.name.toLowerCase();
              }
            } else {
              content = elemt.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputValue.toLowerCase();
          });
          
            // init();
            
    }
    function init() {
        const strValue=String(inputValue);
        const word=strValue[0].toUpperCase() + strValue.substring(1);
        const ul=document.querySelector("ul");
           const arrList =ul.querySelectorAll(".city span"),
            arrayTheList = [];
        for (let i = 0; i < arrList.length; i++) {
          arrayTheList.push(arrList[i].innerHTML);
       
        }console.log(arrayTheList);
        console.log(`${word} "input"` );
       const el= arrayTheList.includes(word);
       console.log(el);
       if (el==true) {
            cautionMessage.textContent = `you have already written ' ${
                inputValue 
          } ' if you want any weather information about the city, you may look at the current list otherwise you can write a different city`;
          cityForm.reset();
          inputWord.focus();
          return ;
        }else {
//fetch section (remember--> .then.then.catch)
const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
fetch(apiLink)
    .then(jsoning => jsoning.json())
    .then(cityWeatherData => {
        const { main, name, sys, weather} = cityWeatherData;//aim of the defining same name is to block confusion,is not mandatory
        //icons from amazon, you can find from different sources
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            weather[0]["icon"]
        }.svg`;
        // creating list items
        const listItems = document.createElement("li");
        listItems.classList.add("city");
        //let's filling the list
        const fillTheList=` <h1 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h1>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${
      weather[0]["description"]
    }">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure> `;
      listItems.innerHTML=fillTheList;
      cityList.appendChild(listItems);
    })
    //catching the errors
    .catch(()=> {
        cautionMessage.textContent="Invalid city name entrance, Please check your input and then try again";
        
    });
        }
        };

    cautionMessage.textContent = "";
    cityForm.reset();
    inputWord.focus();

init();});
