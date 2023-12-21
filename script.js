var randomImage = document.getElementById("random-image");
var randomName = document.getElementById("random-name");
var searchResults = document.getElementById("searchresult");
const searchButton = document.getElementById("Search-Button");
const searchInput = document.getElementById("Input");
const ingredientsDisplay = document.querySelector("#ingredientsDisplay");
const ingredientsList = document.getElementById("ingredientsList");
const Cross = document.getElementById("cross");
const backgroundBlur = document.getElementById("blur");

// searchInput.addEventListener(("keydown", (e) => {
//     if(e.code === "Enter"){
//        searchitemsbyCategory(searchInput.value);
//     }
// }))

let searchResult = document.getElementById("searchresult");
const searchGrid = document.getElementById("foundfood");

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    displayIngredients(data);
    data.meals.forEach((food) => {
      const dish = document.createElement("img");
      dish.setAttribute("src", food.strMealThumb);

      const dishName = document.createElement("p");
      dishName.innerHTML = food.strMeal;

      randomName.appendChild(dishName);
      randomImage.appendChild(dish);
    });
  })
  .catch((error) => {
    console.error(error);
  });

randomImage.addEventListener("click", () => {
  backgroundBlur.style.display = "block";
  ingredientsDisplay.style.display = "block";
});

function displayIngredients(data) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data.meals[0][`strIngredient${i}`];
    const measure = data.meals[0][`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${ingredient} - ${measure}`);
    } else {
      break;
    }
  }

  ingredients.forEach((recipe) => {
    ingredientsList.innerHTML += `<li> ${recipe} </li>`;
  });
}

Cross.addEventListener(
  "click",
  () => {
    ingredientsDisplay.style.display = "none";
    backgroundBlur.style.display = "none";
  },
  true
);

function searchitemsbyCategory(category) {
     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
       .then((response) => response.json())
       .then((data) => {
           displaySearchedItem(data.meals) 
       })
    }

             
          function displaySearchedItem (item) {
            searchGrid.innerHTML = "" ;
             if(item){
        item.forEach((element)=>{
            searchGrid.innerHTML += ` <div class="dish">
            <img src="${element.strMealThumb}" alt="" >
            <p class = "food-desc">${element.strMeal}</p>
           </div>`;
            searchResult.style.display = "block";
         })
        }
    }





    searchButton.onclick = () => {
     const seek = searchInput.value ;
  if (seek) {
      searchitemsbyCategory(seek);
   } 
};



const logo = document.getElementById("search");
logo.addEventListener("click", () => {
    document.getElementById("Input").focus();
})


 