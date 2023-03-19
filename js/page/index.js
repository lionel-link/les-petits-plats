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

    for (let i = 0; i < recipes.length; i++) {
        
      let SlitedTitle = recipes[i].name.split(" ");
      for (let j = 0; j < SlitedTitle.length; j++) {
        if (SlitedTitle[j].substring(0, length).toUpperCase() === searchBar.value.toUpperCase()) {
          for (let k = -1; k < recipesList.length; k++) {
            if (recipesList[k] ? !recipesList[k] === recipes[i] : true) {
              recipesList.push(recipes[i]);
            }
          }
        }
      }

      let SlitedDescription = recipes[i].description.split(" ");
      for (let j = 0; j < SlitedDescription.length; j++) {
        if (SlitedDescription[j].substring(0, length).toUpperCase() === searchBar.value.toUpperCase()) {
          for (let k = -1; k < recipesList.length; k++) {
            if (recipesList[k] ? !recipesList[k] === recipes[i] : true) {
              recipesList.push(recipes[i]);
            }
          }
        }
      }

      for (let m = 0; m < recipes[i].ingredients.length; m++) {
        let Slitedingredient = recipes[i].ingredients[m].ingredient.split(" ");
        for (let j = 0; j < Slitedingredient.length; j++) {
          if (Slitedingredient[j].substring(0, length).toUpperCase() === searchBar.value.toUpperCase()) {
            for (let k = -1; k < recipesList.length; k++) {
              if (recipesList[k] ? !recipesList[k] === recipes[i] : true) {
                recipesList.push(recipes[i]);
              }
            }
          }
        }
      }
    }
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
