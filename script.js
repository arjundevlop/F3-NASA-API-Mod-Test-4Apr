let imgSection = document.getElementById("current-image-container");
let listOfSearches = document.getElementById("search-history");

function getCurrentImageOfTheDay(date){
    imgSection.innerHTML = "";
    let myApiKey = "Hftsxrw8wlG2vSf3qlJJf5RZeHcqALhTbQZ2IdH6";
    let currDate = new Date().toISOString().split("T")[0];
    if(date)
    {
        currDate = date;
    }
    console.log(currDate);
    let fetchData = fetch(`https://api.nasa.gov/planetary/apod?api_key=${myApiKey}&date=${currDate}`);
    fetchData.then((res)=>{
        console.log(res);
        return res.json();
    }).then((data)=>{
        console.log(data);
        let heading = document.createElement("h1");
        heading.innerHTML = `NASA Picture of the Day (${currDate})`;
        imgSection.appendChild(heading);

        let imgOfDay = document.createElement("img");
        imgOfDay.setAttribute("src",data.url);
        imgSection.appendChild(imgOfDay);

        let titleSpan = document.createElement("span");
        titleSpan.innerHTML = data.title;
        imgSection.appendChild(titleSpan);

        let explanation = document.createElement("p");
        explanation.innerHTML = data.explanation;
        imgSection.appendChild(explanation);
    })
}
getCurrentImageOfTheDay();



let searchesArr = JSON.parse(localStorage.getItem("searches")) || [];
searchesArr.forEach((date) => {
    const listItem = document.createElement("li");
    listItem.textContent = date;
    listOfSearches.appendChild(listItem);
    listItem.style.color = "blue";
    listItem.style.cursor = "pointer";
    listItem.addEventListener("click",function(){
        getCurrentImageOfTheDay(date);
    })
  });

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click",getImageOfTheDay);

function getImageOfTheDay(e){
    e.preventDefault();
    let inputDateValue = document.getElementById("search-input").value;
    
    saveSearch(inputDateValue);
    addSearchToHistory();
    
    getCurrentImageOfTheDay(inputDateValue);   
}

function saveSearch(date){
    if(!searchesArr.includes(date))
    {
        searchesArr.push(date);

    }
    
    localStorage.setItem("searches",JSON.stringify(searchesArr));
}

function addSearchToHistory(){
    listOfSearches.innerHTML="";
    let searchArr = JSON.parse(localStorage.getItem("searches"));
    searchArr.map((item)=>{
        let li = document.createElement("li");
        li.innerHTML = item;
        listOfSearches.appendChild(li);
        li.style.color = "blue";
        li.style.cursor = "pointer";
        li.addEventListener("click",function(){
            getCurrentImageOfTheDay(item);
        })
    })
}




