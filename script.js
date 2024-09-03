const URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropsel = document.querySelectorAll(".dropdown select");
const but=document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg= document.querySelector(".msg");

for (let select of dropsel) {
  for (currCode in countryList) {
    let newOp = document.createElement("option");
    newOp.innerText = currCode;
    newOp.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOp.selected = "selected";
    } 
    else if (select.name === "to" && currCode === "USD") {
      newOp.selected = "selected";
    }
    select.append(newOp);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag=(element)=>{
  let crntcode =element.value;
  let councode=countryList[crntcode];
  let newimg=`https://flagsapi.com/${councode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src =newimg;
};

but.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval=amount.value;
  if(amtval==="" || amtval<1){
    amtval=1;
    amount.value = "1";
  }
  const url =`${URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}`;
  let response = await fetch (url);
  let data= await response.json();
  let rate= data[tocurr.value.toLowerCase()];
  let famt = amtval * rate;
  console.log(famt);
  msg.innerText = `${amtval} ${fromcurr.value} = ${famt} ${tocurr.value}`;
})

/*
const updateExchangeRate = async () => {
    let amt =document.querySelector(".amount input");
    let amtval=amt.value;
    if (amtval=="" || amtval<1){
        amtval=1;
        amount.value=1;
    }
    const BURL = `${URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch (BURL);
    let data= await response.json();
    let rate= data[tocurr.value.toLowerCase()];
    let famt = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${famt} ${tocurr.value}`;
  };

but.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
  });  */