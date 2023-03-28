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

function buidRecipesDom(recipesDom) {
  let div = document.createElement("div");
  div.classList.add("card-container");
  if (recipesDom) {
    //console.log("🚀 ~ file: index.js:169 ~ selectedItems.forEach ~ cardContainer:", cardContainer.children[0])
    cardContainer.innerHTML = '';

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
    buidRecipesDom(recipesList);
    return;
  }
  if (refresh && searchBar.value.length < 3) {
    cardContainer.removeChild(cardContainer.children[0]);
    buidRecipesDom();
    refresh = false;
  }
}

export function menuFilter(selectedItems) {
  let recipesListFilter = [];

  selectedItems.forEach((item) => {
    let { content, type } = item;
    type = type.split("-");
    type = type[0];
    content = content.toLowerCase();
    let recipesFilter = [];

    recipesList.length === 0 ? (recipesFilter = recipes) : (recipesFilter = recipesList);
    console.log("🚀 ~ file: index.js:106 ~ selectedItems.forEach ~ recipesList:", recipesList)

    recipesFilter.forEach((recipe) => {
      let findRecipe = false;

      if (type === "appliance") {
        //debugger
        if (recipe[type].toLowerCase().includes(content)) {
          if (selectedItems.length > 1  && recipe[type].toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "appliance-choice") {
            recipesListFilter.push(recipe);
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
        //debugger
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toLowerCase().includes(content)) {
            console.log(selectedItems.length > 1 && ingredient.ingredient.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "ingredient");
            if (selectedItems.length > 1 && ingredient.ingredient.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "ingredient-choice") {
              //debugger
              recipesListFilter.push(recipe);
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
            if (selectedItems.length > 1 && ustensil.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "ustensil-choice") {
              recipesListFilter.push(recipe);
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
  if (recipesListFilter.length > 0) {
    recipesList = recipesListFilter
    console.log("🚀 ~ file: index.js:169 ~ menuFilter ~ recipesList:", recipesList)
    //console.log("🚀 ~ file: index.js:169 ~ selectedItems.forEach ~ cardContainer:", document.querySelector(".card-container"))
    cardContainer.innerHTML = '';
  }
  buidRecipesDom(recipesList);
}

buidRecipesDom();
filter();
