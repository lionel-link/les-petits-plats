import { getAppliances, getIngredients, getRecipes, getUstensils } from "../../data/recipesData.js";
import { recipesFactory } from "../factories/recipesFactories.js";

const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("main-search-input");
searchBar.addEventListener("keyup", filter);

const recipes = getRecipes();
const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getUstensils();

let refresh = false;

function buidRecipesDom(recipesDom) {
  let div = document.createElement("div");
  div.classList.add("card-container");
  if (recipesDom) {
    cardContainer.removeChild(cardContainer.children[0]);

    recipesDom.forEach((recipe) => {
      div.appendChild(recipesFactory(recipe));
    });

    cardContainer.appendChild(div);
  } else {
    recipes.forEach((recipe) => {
      let recipeDOM = recipesFactory(recipe);

      div.appendChild(recipeDOM);
    });
    cardContainer.appendChild(div);
  }
}

function filter(research) {
  let recipesList = [];

  if (searchBar.value.length >= 3) {
    let length = searchBar.value.length;

    recipes.forEach((recipe) => {
      let SlitedTitle = recipe.name.split(" ");
      SlitedTitle.forEach((word) => {
        if (word.substring(0, length).toUpperCase() === searchBar.value.toUpperCase()) {
          if (recipesList.length === 0) {
            recipesList.push(recipe);
          } else {
            recipesList.forEach((recip) => {
              if (!(recip === recipe)) {
                recipesList.push(recipe);
              }
            });
          }
        }
      });

      let SlitedDescription = recipe.name.split(" ");
      SlitedDescription.forEach((word) => {
        if (word.substring(0, length).toUpperCase() === searchBar.value.toUpperCase()) {
          if (recipesList.length === 0) {
            recipesList.push(recipe);
          } else {
            recipesList.forEach((recip) => {
              if (!(recip === recipe)) {
                recipesList.push(recipe);
              }
            });
          }
        }
      });

      recipe.ingredients.forEach((ingredient) => {
        let SlitedIngredient = ingredient.ingredient.split(" ");
        SlitedIngredient.forEach((word) => {
          if (word.substring(0, length).toUpperCase() === searchBar.value.toUpperCase()) {
            if (recipesList.length === 0) {
              recipesList.push(recipe);
            } else {
              recipesList.forEach((recip) => {
                if (!(recip === recipe)) {
                  recipesList.push(recipe);
                }
              });
            }
          }
        });
      });
    });
    refresh = true;
    buidRecipesDom(recipesList);
    return;
  }
  if (refresh && searchBar.value.length < 3) {
    cardContainer.removeChild(cardContainer.children[0]);
    buidRecipesDom();
    refresh = false;
  }
}

buidRecipesDom();
filter();
