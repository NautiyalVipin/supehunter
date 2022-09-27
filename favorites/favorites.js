
// Declaring variable

let heroes = JSON.parse(localStorage.getItem("_favorites")); //Loading data from "_favorites" key from localstorage

// Mounting Favorite Hero List
mountHeroList(heroes);

// To Mount Favorite list on DOM 
function mountHeroList(heroes){
  heroesList = [...heroes];
  var heroList = document.querySelector("#heroList");
  heroList.innerHTML = heroes
    .map(function (hero) {
      let image =
        hero.thumbnail.path + "/standard_fantastic." + hero.thumbnail.extension;
      return `<div class="movie-list-item">
        <img class="movie-list-item-img" src=${image} alt="">
        <span 
        onclick="showDetails(${hero.id})"
        class="movie-list-item-title">${hero.name}</span>
        <button onclick="removeFromFav(${hero.id})" class="movie-list-item-button">Remove from Favorites</button>
        </div>`;
    })
    .join("");
};

// To remove selected hero from favorite list 
function removeFromFav(id){
  heroes = heroes.filter((hero) => hero.id !== id);
  mountHeroList(heroes);
  localStorage.setItem("_favorites", JSON.stringify(heroes)); //Update "_favorites" key in localstorage
};

// Redirect to a superhero page and load localstorage
function showDetails(id) {
  let hero = heroesList.find((hero) => hero.id === id);
  localStorage.setItem("_superhero", JSON.stringify(hero)); //Set "_superhero" key with hero details
  location.assign("../superhero"); // Load the superhero page
}


