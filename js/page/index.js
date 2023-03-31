import { getAppliances, getIngredients, getRecipes, getUstensils } from "../../data/recipesData.js";
import { recipesFactory } from "../factories/recipesFactories.js";

const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("main-search-input");
searchBar.addEventListener("keyup", (e) => {
  filter(e.target);
});

const recipes = getRecipes();
const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getUstensils();
let recipesList = [];

let refresh = false;

export function buildRecipesDom(recipesDom) {
  let div = document.createElement("div");
  div.classList.add("card-container");
  if (recipesDom) {
    cardContainer.innerHTML = "";

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
  let length = 0;
  research ? (length = research.value.length) : "";
  research ? (research = research.value.toLowerCase()) : "";

  if (length >= 3) {
    recipes.forEach((recipe) => {
      let findRecipe = false;

      if (recipe.name.toLowerCase().includes(research)) {
        if (recipesList.length === 0) {
          recipesList.push(recipe);
        } else {
          recipesList.forEach((recipeList) => {
            recipeList.id === recipe.id ? (findRecipe = true) : null;
          });
          findRecipe ? "" : recipesList.push(recipe);
        }
      }

      if (recipe.description.toLowerCase().includes(research)) {
        if (recipesList.length === 0) {
          recipesList.push(recipe);
        } else {
          recipesList.forEach((recipeList) => {
            recipeList.id === recipe.id ? (findRecipe = true) : null;
          });
          findRecipe ? "" : recipesList.push(recipe);
        }
      }

      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(research)) {
          if (recipesList.length === 0) {
            recipesList.push(recipe);
          } else {
            recipesList.forEach((recipeList) => {
              recipeList.id === recipe.id ? (findRecipe = true) : null;
            });
            findRecipe ? "" : recipesList.push(recipe);
          }
        }
      });
    });
    refresh = true;
    buildRecipesDom(recipesList);
    return;
  }
  if (refresh && searchBar.value.length < 3) {
    cardContainer.removeChild(cardContainer.children[0]);
    buildRecipesDom();
    refresh = false;
  }
}

export function menuFilter(selectedItems, deleteItems) {
  let recipesListFilter = [];
  deleteItems ? (recipesList = []) : null;
  let NotfindRecipe = false;

  selectedItems.forEach(function callback(item, index) {
    let { content, type } = item;

    content = content.toLowerCase();
    let recipesFilter = [];

    recipesList.length === 0 ? (recipesFilter = recipes) : (recipesFilter = recipesList);

    recipesFilter.forEach((recipe) => {
      let findRecipe = false;

      if (type === "appliance") {
        if (recipe[type].toLowerCase().includes(content)) {
          
          if (index > 0 && recipe[type].toLowerCase() === content && selectedItems[index].type === "appliance") {
            recipesListFilter.push(recipe);
            NotfindRecipe = true;
          } else {
            if (recipesList.length === 0) {
              recipesList.push(recipe);
            } else {
              recipesList.forEach((recipeList) => {
                recipeList.id === recipe.id ? (findRecipe = true) : null;
              });
              findRecipe ? "" : recipesList.push(recipe);
            }
          }
        }
      } else if (type === "ingredient") {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toLowerCase().includes(content)) {
            if (index > 0 && ingredient.ingredient.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "ingredient") {
              recipesListFilter.push(recipe);
              NotfindRecipe = true;
            } else {
              if (recipesList.length === 0) {
                recipesList.push(recipe);
              } else {
                recipesList.forEach((recipeList) => {
                  recipeList.id === recipe.id ? (findRecipe = true) : null;
                });
                findRecipe ? "" : recipesList.push(recipe);
              }
            }
          }
        });
      } else {
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil.toLowerCase().includes(content)) {
            if (index > 0 && ustensil.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "ustensil") {
              recipesListFilter.push(recipe);
              NotfindRecipe = true;
            } else {
              if (recipesList.length === 0) {
                recipesList.push(recipe);
              } else {
                recipesList.forEach((recipeList) => {
                  recipeList.id === recipe.id ? (findRecipe = true) : null;
                });
                findRecipe ? "" : recipesList.push(recipe);
              }
            }
          }
        });
      }
    });
  });
  recipesListFilter.length > 0 ? (recipesList = recipesListFilter) : null;
  selectedItems.length === 0 ? (recipesList = recipes) : null;
  if (selectedItems.length > 1 && NotfindRecipe === false){
    recipesList = []
  }
  return recipesList;
}

buildRecipesDom();
filter();
