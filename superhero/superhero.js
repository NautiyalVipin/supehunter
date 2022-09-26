
// Declaring variables 

let hero = JSON.parse(localStorage.getItem("_superhero")); //Fetching details of the hero from localstorage using key "_superhero"
const list = document.getElementById("info");


// Mounting hero information 
mountInfo("info");

// Mounting lists of Hero Details
mountList("movies-list", "stories");
mountList("series-list", "series");
mountList("events-list", "events");
mountList("comics-list", "comics");


// To Update hero information on the DOM
function mountInfo(id) {
    var list = document.getElementById(id);
    let image =
      hero.thumbnail.path + "/portrait_uncanny." + hero.thumbnail.extension;
    list.childNodes[1].src = image;
    list.childNodes[3].childNodes[1].innerText = hero.name;
    list.childNodes[3].childNodes[3].innerText = hero.description;
}
 
// To Mount hero details list on the DOM
function mountList(id, type) {
  const list = document.getElementById(id);
  list.innerHTML = hero[type].items
    .map(function (item) {
      return `
            <li
            onclick="showLink('${item.resourceURI}')"
            >${item.name}</li>`;
    })
    .join("");
}


// Toggle Hero Detail lists 
function showList(id) {
    let element = document.getElementById(id);
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }


// Loads a page on clicking a Hero Detail list Item
async function showLink(url) {
  try {
    url = url.replace("http","https")
    console.log(url)
    const KEY2 = "c00ff171271ec4c0d8fee0082addf5e0236f3321";
    const KEY1 = "fba0e41d592e6e477ec723da6c2bb495";
    const ts = Date.now().toString();
    const str = (ts + KEY2 + KEY1).toString();
    const hash = CryptoJS.MD5(str).toString();
    let string = `?ts=${ts}&apikey=${KEY1}&hash=${hash}`;
    let link = url + string;
    let response = await fetch(link);
    let data = await response.json();
  
    localStorage.setItem("_herodetail", JSON.stringify(data.data.results[0])); //Loading detail to "_herodetail" key in localstorage
    location.assign("/superhero/herodetail"); // Loading the herodetail page
    
  } catch (error) {
    
    alert(error)
  }
 
}


