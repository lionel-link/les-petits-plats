import { getAppliances, getIngredients, getRecipes } from "../../data/recipesData.js";
import { recipesFactory } from "../factories/recipesFactories.js";

const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("main-search-input");

const recipes = getRecipes();
const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getU();

function buidRecipesDom(recipesDom) {
  if (recipesDom) {
  } else {
    recipes.forEach((recipe) => {
      let recipeDOM = recipesFactory(recipe);
      cardContainer.appendChild(recipeDOM);
    });
  }
}

function researchHandler(research) {
  searchBar.addEventListener("keyup", researchHandler);

  if (searchBar.value.length >= 3) {
    recipes.forEach((recipe) => {
      if (
        recipe.name.substring(0, 3).toUpperCase() ===
        searchBar.value.toUpperCase()
      ) {
        recipesList.push(recipe);
      }
    });
  }
}

buidRecipesDom();
researchHandler();
