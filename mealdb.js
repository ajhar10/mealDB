document.getElementById('api-error').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const displayfield = document.getElementById('empty');
    document.getElementById('api-error').style.display = 'none';
    displayfield.textContent = '';
    const searchValue = searchField.value;
    searchField.value = '';
    if (searchValue == '') {
        const div = document.createElement('div');
        div.classList.add('empty')
        div.innerHTML = `<h3 class="text-center mx-auto ">Not available in our site.</h3>`
        displayfield.appendChild(div);
    }

    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`

        fetch(url)
            .then(response => response.json())
            .then(data => displayFood(data.meals))
            .catch(error => errorApi(error))
    }
}
// api error display 
const errorApi = error => {
    console.log(error);
    document.getElementById('api-error').style.display = 'block';
}

const displayFood = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals == null) {
        const div = document.createElement('div');
        div.classList.add('not-available');
        div.innerHTML = `<h3>Not available in our site.</h3>`
        searchResult.appendChild(div)
    }
    else {
        meals.forEach(meal => {
            const div = document.createElement('div');
            // div.classList.add('col');

            div.innerHTML = `<div onclick='showDetails(${meal.idMeal})' class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0 - 200)}</p>
            </div>
        </div>`
            searchResult.appendChild(div);
            // console.log(meal);
        });
    }

}

const showDetails = mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`

    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    const mealDetail = document.getElementById('meal-details');
    mealDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 160)}.</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
  `
    mealDetail.appendChild(div)
}