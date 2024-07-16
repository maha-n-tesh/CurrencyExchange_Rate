const selectdrop = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of selectdrop){
    for(let currCode in countryList){
        // console.log(currCode, countryList[currCode])
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let img = element.parentElement.querySelector("img");
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    img.src = newsrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue == "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }
    const URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_sLcrXb3qD2Cslrdf5F7IVbPkyQoWKcJ7DkW2OSsn";
    let fetching = await fetch(URL);
    let response = await fetching.json();
    let fromvalue = fromcurr.value;
    let tovalue = tocurr.value;
    let rate = response.data[tovalue].value;
    let finalamt = amtValue * rate;

    msg.innerText = `${amtValue} ${fromvalue} = ${finalamt} ${tovalue}`;

})