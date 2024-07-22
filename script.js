async function foo(){

    var container = document.createElement("div");
    container.setAttribute("class","container");
    container.setAttribute("style","background-color: #c2d9fc")

    var row= document.createElement("div");
    row.setAttribute("class","row m-2");

    var heading = document.createElement("h1")
    heading.setAttribute("class","head p-4 text-center shadow-lg p-3  mb-5 bg-white rounded")
    heading.setAttribute("style","font-family: Rockwell;color:#b50cf7; text-shadow: 2px 2px #7dddfa;")
    heading.innerHTML = "⋉ All Countries Weather ⋊";

    try{
        let data = await fetch("https://restcountries.com/v3.1/all");
        let resp = await data.json();
        console.log(resp);
            resp.forEach(element => {
                let col = document.createElement("div");
                col.setAttribute("class","col-lg-4 col-md-4 col-sm-12 mb-3 mt3");

                var card = document.createElement("div");
                card.setAttribute("class","card text-center shadow-sm p-3 mb-5 bg-white rounded");
                card.setAttribute("style","border:0; box-shadow:1px 1px 2px #adaaaa");

                let cardHead = document.createElement("div")
                cardHead.setAttribute("class","card-header text-center");
                cardHead.innerHTML=element.name.common;
                cardHead.setAttribute("style","background: #0c244d; color:white");
                card.append(cardHead);

                var cardBody = document.createElement("div");
                cardBody.setAttribute("class","card-body");
                cardBody.setAttribute("style","font-size:15px;  font-family:Gill Sans MT; background: rgb(232,239,162);background: linear-gradient(84deg, rgba(232,239,162,1) 13%, rgba(210,103,255,0.801733193277311) 48%, rgba(31,250,255,0.7905287114845938) 82%);")
                
                var cardFlag = document.createElement("img");
                cardFlag.setAttribute("class","card-img-top");
                cardFlag.src = element.flags.png;
                cardFlag.setAttribute("style","width:250px; heigth:150px; margin-bottom:15px");
                cardBody.append(cardFlag);

                var cardCaps = document.createElement("div");
                cardCaps.setAttribute("class","card-text");
                cardCaps.innerHTML = `Capital : ${element.capital}`;
                cardBody.append(cardCaps);
                
                var cardRegion = document.createElement("div");
                cardRegion.setAttribute("class","card-text");
                cardRegion.innerHTML = `Region : ${element.region}`;
                cardBody.append(cardRegion)

                var cardlatlang = document.createElement("div");
                cardlatlang.setAttribute("class","card-text");
                cardlatlang.innerHTML = `Lat & lang : ${element.latlng}`;
                cardBody.append(cardlatlang);
                
                var cardCode = document.createElement("div");
                cardCode.setAttribute("class","card-text");
                cardCode.innerHTML = `Country Code : ${element.cioc}`;
                cardBody.append(cardCode)

                var cardBtn = document.createElement("button");
                cardBtn.setAttribute("type","button");
                cardBtn.setAttribute("class","weather-btn btn btn-outline-dark mt-3");
                
                cardBtn.setAttribute("style","color:blue")
                cardBtn.setAttribute("data-lat",`${element.latlng[0]}`);
                cardBtn.setAttribute("data-lon",`${element.latlng[1]}`);
                cardBtn.innerHTML = `Click for Weather`;
               
                cardBtn.addEventListener("click", async function () {
                    console.log("button clicked")
                        var lat = this.getAttribute("data-lat");
                        var lon = this.getAttribute("data-lon");
                        var temperature = await Weather(lat, lon);
                        var cardBody = this.parentElement;
                        var temperatureElement = document.createElement("p");
                        temperatureElement.textContent = `Temperature: ${temperature}°C`;
                        cardBody.replaceChild(temperatureElement, this);
                });
                cardBody.append(cardBtn);

                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);

               
            });
        
          
    }
    catch(error) {
        console.log(error);
      }

    container.append(heading,row);
    document.body.appendChild(container);
}

foo();

async function Weather(lat,lon,button){
    //let apiKey = 'efafcdb7f2c1f58f8c232aef43180c28';
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=efafcdb7f2c1f58f8c232aef43180c28`);
    let resp = await data.json();
    console.log(resp);
    return(resp.main.temp - 273.15).toFixed(2);
}