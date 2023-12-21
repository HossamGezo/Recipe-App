// ! ------------------------------------------- Variables

let searchInput = document.querySelector(".search-input");
let search = document.querySelector(".search");
let recipes = document.querySelector(".recipes");
let recipeDetailes = document.querySelector(".recipe-detailes");
let close = document.querySelector(".close");

// ! ------------------------------------------- Events

search.addEventListener("click", getInputValue);
searchInput.addEventListener("keydown", pressEnter);
close.addEventListener("click", closeRecipeDetailes)

// ! ------------------------------------------- Functions

// ---------- Get Input Value Function
function getInputValue() {
  let value = searchInput.value;
  if (value) {
    FetchMeal(value, null);
    searchInput.value = "";
  }
}

// ---------- Press Enter Function
function pressEnter(event) {
  if (event.code === "Enter") {
    getInputValue();
  }
}

// ---------- Fetch Meal Function
async function FetchMeal(mailName, mailId) {
  let response;
  if (mailName) {
    response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mailName}`)).json();
    showData(response.meals);
  } else {
    response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mailId}`)).json();
    showDetailes(response.meals[0]);
  }
}

// ---------- Show Data Function
function showData(data) {
  recipes.innerHTML = "";
  for (let i = 0; i < data.length; ++i) {
    recipes.innerHTML += `
      <div class="recipe">
        <img src="${data[i].strMealThumb}" alt="IMAGE"/>
        <div class="recipe-body">
          <h3 class="recipe-body--head">${data[i].strMeal}</h3>
          <button id="${data[i].idMeal}" class="myBtn" onclick="FetchMeal(null, this.id)">Get Recipe</button>
        </div>
        <!-- // Recipe Body -->
      </div>
      <!-- // Recipe -->
    `;
  }
}

// ---------- Show Data Function
function showDetailes(data) {
  console.log(data.strMeal);
  recipeDetailes.classList.remove("show-detailes");
  let head = document.querySelector(".recipe-detailes--head");
  head.innerText = data.strMeal;
  let desc = document.querySelector(".recipe-detailes--desc");
  desc.innerText = data.strInstructions;
  let link = document.querySelector("a");
  link.href = data.strYoutube;
}

// ---------- Close Recipe Detailes Function
function closeRecipeDetailes() {
  recipeDetailes.classList.add("show-detailes");
}