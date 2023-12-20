var randomImage = document.getElementById("random-image")
var randomName = document.getElementById("random-name")
var searchResults = document.getElementById("searchresult")
const searchButton = document.getElementsByClassName("Search-Button")
const searchInput = document.getElementById("Input")
const ingredientsDisplay = document.querySelector('#ingredientsDisplay')
const ingredientsList = document.getElementById('ingredientsList')
const Cross = document.getElementById("cross") ;
const backgroundBlur = document.getElementById("blur") ;



fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        displayIngredients(data);
        data.meals.forEach((food) => {
            const dish = document.createElement('img');
            dish.setAttribute('src', food.strMealThumb);

            const dishName = document.createElement('p');
            dishName.innerHTML = food.strMeal;

            randomName.appendChild(dishName);
            randomImage.appendChild(dish);
 });
    })
    .catch((error) => {
        console.error(error);
    });

          randomImage.addEventListener('click', () => {
             backgroundBlur.style.display = 'block' ;
                ingredientsDisplay.style.display = 'block';
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
        console.log(ingredients)
        ingredients.forEach((recipe)=>{
            ingredientsList.innerHTML += `<li> ${recipe} </li>`
        })
}

    Cross.addEventListener('click', () => {
        ingredientsDisplay.style.display = 'none';
        backgroundBlur.style.display = 'none' ;
    },true);

    