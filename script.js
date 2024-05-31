// script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navList = document.querySelector('.nav-list');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const recipesContainer = document.getElementById('recipes-container');

    const apiKey = '94f28d08595c48e6bfdfc66d50e2f2c5'; // Reemplaza con tu clave de API
    const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + apiKey + '&query=';

    menuIcon.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            fetchRecipes(query);
        }
    });

    function fetchRecipes(query) {
        fetch(apiUrl + query)
            .then(response => response.json())
            .then(data => displayRecipes(data.results))
            .catch(error => console.error('Error fetching recipes:', error));
    }

    function displayRecipes(recipes) {
        recipesContainer.innerHTML = ''; // Limpia los resultados anteriores
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h2>${recipe.title}</h2>
                <p>${recipe.summary ? recipe.summary.slice(0, 100) + '...' : 'No description available.'}</p>
                <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    }
});