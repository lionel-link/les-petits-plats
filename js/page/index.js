import { getAppliances, getIngredients, getRecipes, getUstensils } from "../../data/recipesData.js";
import { recipesFactory } from "../factories/recipesFactories.js";

const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("main-search-input");

const recipes = getRecipes();
const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getUstensils();

function buidRecipesDom(recipesDom) {
  if (recipesDom) {
  } else {
    recipes.forEach((recipe) => {
      let recipeDOM = recipesFactory(recipe);
      cardContainer.appendChild(recipeDOM);
    });
  }
}



buidRecipesDom();
