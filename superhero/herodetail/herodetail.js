

// Declaraing variables 
let hero = JSON.parse(localStorage.getItem("_herodetail")); //Fetching data from local storage key "_herodetail"
const list = document.getElementById("info");

// Mounting Herodetail information
mountInfo("info");

// To mount herodetail information on the DOM
function mountInfo(id) {
  var list = document.getElementById(id);
  let image =
    hero.thumbnail.path + "/portrait_uncanny." + hero.thumbnail.extension; //Image link for the herodetail list item
  list.childNodes[1].src = image;
  list.childNodes[3].childNodes[1].innerText = hero.title;
  list.childNodes[3].childNodes[3].innerText = hero.description;
}


