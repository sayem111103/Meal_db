const loadData = (search) => {
  console.log(search);
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (data) => {
  const container = document.getElementById("parentContainer");
  container.textContent = "";
  data = data.slice(0, 6);
  data.forEach((mealsData) => {
    // console.log(mealsData);
    const newElement = document.createElement("div");
    newElement.classList.add("card");
    newElement.classList.add("card-side");
    newElement.classList.add("bg-base-100");
    newElement.classList.add("shadow-xl");
    newElement.innerHTML = `
    <figure><img style= "width: 250px" src="${mealsData.strMealThumb}"/></figure>
  <div class="card-body">
    <h2 class="card-title">${mealsData.strMeal}</h2>
    <h4 class = "text-lg font-bold">Ingredient:</h4>
    <p class= grow-0>${mealsData.strIngredient1}</p>
    <p class= grow-0>${mealsData.strIngredient2}</p>
    <p class= grow-0>${mealsData.strIngredient3}</p>
    <p class= grow-0>${mealsData.strIngredient4}</p>
    <p class= grow-0>${mealsData.strIngredient5}</p>
    <div class="card-actions justify-end">
    <!-- The button to open modal -->
    <label for="meal-modal" class="btn btn-primary" onclick="detailsData('${mealsData.idMeal}')">Details</label>
    </div>
  </div>
    `;
    container.appendChild(newElement);
  });
};

const detailsData = (id) => {
  console.log(id);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => mealDetail(data.meals[0]));
};

const mealDetail = (meal) => {
  console.log(meal);
  const modalTitle = document.getElementById("meal_tiitle");
  modalTitle.innerText = meal.strMeal;
  const modalImages = document.getElementById("images");
  // modalImages.classList.add('sm:w-[200px]')
  modalImages.setAttribute("src", `${meal.strMealThumb}`);
  const modalBody = document.getElementById("meal_body");
  modalBody.innerText = meal.strInstructions;
};

// const search = () =>{
const search = document.getElementById("Search_form");
search.addEventListener("click", function () {
  const inputField = document.getElementById("inputvalue");
  const inputFieldvalue = inputField.value;
  loadData(inputFieldvalue);
});

document
  .getElementById("inputvalue").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const inputField = document.getElementById("inputvalue");
      const inputFieldvalue = inputField.value;
      loadData(inputFieldvalue);
    }
  });
// }
