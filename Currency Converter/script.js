const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msgElement = document.querySelector(".msg");

// for(code in countryList){
//     console.log(code, countryList[code]);
// }

for (let select of dropdowns){
    for (currencyCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.textContent = currencyCode;
        newOptions.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD"){
            newOptions.selected = "selected";
        }
        else if(select.name === "to" && currencyCode === "INR"){
            newOptions.selected = "selected"
        }
        select.append(newOptions);
    }
    select.addEventListener("change", (event) =>{
        updateFlag(event.target);
    });
}

let updateFlag = (element) =>{
    // console.log(element);
    let currencyCode = element.value;
    // console.log(currencyCode);
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    };

    // console.log(fromCurr.value, toCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let responce = await fetch(URL);
    // console.log(responce);
    let data = await responce.json();
    // console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amtVal * rate;
    msgElement.textContent = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (event) =>{
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () =>{
    updateExchangeRate();
});