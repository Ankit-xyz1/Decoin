//  this funtions turns the amount to some organised number 
function formatNumber(amount) {
  if (amount >= 1e12) {
    // If the number is in the trillion range
    return (amount / 1e12).toFixed(1) + ' trillion$';
  } else if (amount >= 1e9) {
    // If the number is in the billion range
    return (amount / 1e9).toFixed(1) + ' B$';
  } else if (amount >= 1e6) {
    // If the number is in the million range
    return (amount / 1e6).toFixed(1) + ' M$';
  } else if (amount >= 1e3) {
    // If the number is in the thousand range
    return (amount / 1e3).toFixed(1) + 'k$';
  } else {
    // If it's less than a thousand, return as is
    return amount + '$';
  }
}

// this functions create element and price assigner CEAPA
function CEAPA() {
  // Get the price-box container
  const priceBox = document.querySelector('.price-box');

  // Add 10 new divs with unique ids
  for (let i = 1; i <= 99; i++) {
    // Create a new div element
    const newDiv = document.createElement('div');

    // Set the class and unique id for the div
    newDiv.className = 'grid-template';

    newDiv.setAttribute("onclick",`nextpage(${i+1})`)
    newDiv.id = `xyz${i}`;

    // Add span elements to the new div
    newDiv.innerHTML = `
    <span class=""></span>
    <span class="">Rank</span>
    <span class="">name</span>
    <span class="">price</span>
    <span class="">24H</span>
    <span class="visiblity">market cap</span>
    `;

    // Append the new div to the price-box container
    priceBox.appendChild(newDiv);
  }
}

// retriving the data via api
async function get_value() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let response = await fetch("https://rest.coincap.io/v3/assets?apiKey=aa927d611f6da201f0f5ea170a79298a33ba280994de88eb3ff864c3a3880d4c", requestOptions);
  let data = await response.json();
  // console.log(data)
  return data;
}

// the mainc function thats display the data retived from the api
function mainC() {
  // lopping through all the elements
  for (let i = 0; i <= 100; i++) {
    get_value().then((value) => {
      // fetching the object here
      let a = value.data
      console.log(a) 
      // create a dynamic index for acessing all elements nodes of targetted element
      let ii = "xyz" + i
      // acessing the elsemt 
      let elemt = document.getElementById(ii).children
      // console.log(elemt)
      // it display the rank of crypto
      elemt[1].innerHTML = a[i].rank

      // it dsiaplsy the name 
      let symbol =a[i].symbol
      elemt[2].innerHTML =  "  " +`<strong>${symbol}</strong>`

      // the price setting of cryptos
      if (a[i].priceUsd > 1)
        elemt[3].innerHTML = `<strong>$ ${Math.round(a[i].priceUsd)}</strong>`
      else {
        let price1 = a[i].priceUsd * 100
        let price2 = price1 / 100
        let price3 = price2.toPrecision(3)
        elemt[3].innerHTML =  "$"+price3
      }

      // the 24 hr change of crypto
      let c24hr1 = a[i].changePercent24Hr * 100
      let c24hr2 = c24hr1 / 100
      let c24hr3 = c24hr2.toPrecision(3)
      elemt[4].innerHTML = c24hr3 + "%"
      if(c24hr2>0){
        elemt[4].style.color ="green"
      }
      else{
        elemt[4].style.color ="red"
      }

      // the market cap setting of crypto
      let mcap1 = a[i].marketCapUsd * 2
      let mcap2 = mcap1 / 2
      let mcap3 = Math.trunc(mcap2)
      let mcap4 = formatNumber(mcap3)
      elemt[5].innerHTML = mcap4

    })
  }
}


// calling create element function
CEAPA();
// calling mainC to load data on the page for first time
mainC()
// using set interval and calling mainC and api fetch top updates price since it changes constantly
// updating it every 5 minute
setInterval(async() => {
  await get_value()
  mainC()
},300000);



// Moving user to next page
function nextpage(rank){
  console.log(rank)
  window.location.href = "details.html"; 
}












