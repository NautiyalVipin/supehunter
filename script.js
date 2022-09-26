
// Initializing Variables

let heroesList = [];
let favorites = JSON.parse(localStorage.getItem("_favorites"))
  ? JSON.parse(localStorage.getItem("_favorites"))
  : [];


// Fetching Initial Heroes List on first reload 
getInitialList();


// To Fetch initial Heroes List

function getInitialList() {
  fetch("./db.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      mountHeroList(data.results);
    });
}


// Fetch data using the Search Keyword

async function fetchData(search) {
  try {
    const KEY2 = "c00ff171271ec4c0d8fee0082addf5e0236f3321";
    const KEY1 = "fba0e41d592e6e477ec723da6c2bb495";
    const ts = Date.now().toString();
    const str = (ts + KEY2 + KEY1).toString();
    const hash = CryptoJS.MD5(str).toString();
    let response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&ts=${ts}&apikey=${KEY1}&hash=${hash}`
    );
    let data = await response.json();
    let btn = document.getElementById("close-search");
    btn.style.display = "block";
    scrollTo(0, 240);
    if (data.data.results.length === 0) {
      const heroList = document.querySelector("#heroList");
      heroList.innerHTML = "Try a different keyword";
      return;
    }
    mountHeroList(data.data.results);
  } catch (error) {
    console.log(error);
  }
}



//Mounting the herolist to DOM  

function mountHeroList(heroes) {
  heroesList = [...heroes];
  const heroList = document.querySelector("#heroList");
  heroList.innerHTML = heroes
    .map(function (hero) {
      let image =
        hero.thumbnail.path + "/standard_fantastic." + hero.thumbnail.extension;
      return `<div class="movie-list-item">
        <img 
        class="movie-list-item-img" src=${image} alt="">
        <span
        onclick="showDetails(${hero.id})"
        class="movie-list-item-title">${hero.name}</span>
        <button onclick="addToFav(${hero.id})" class="movie-list-item-button">Add To Favorites</button>
        </div>`;
    })
    .join("");
}


// Onclick function for showing details of a Hero according to the ID

function showDetails(id) {
  let hero = heroesList.find((hero) => hero.id === id);
  localStorage.setItem("_superhero", JSON.stringify(hero));
  location.assign("./superhero");
}

// Add a particular Hero to favorites list according to the ID 

function addToFav(id) {
  let hero = heroesList.find((hero) => hero.id === id);
  favorites.push(hero);
  localStorage.setItem("_favorites", JSON.stringify(favorites)); //Updating the "_favorites" key in localstorage
}

// Populate heroes list with search response  according to the Keyword 

function searchData(id) {
  let element = document.getElementById(id);
  fetchData(element.value);
  element.value = "";
}

// Close Search and reset Heroes List

function closeSearch() {
  let btn = document.getElementById("close-search");
  btn.style.display = "none";
  getInitialList();
}

