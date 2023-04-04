import { getAppliances, getIngredients, getRecipes, getUstensils } from "../../data/recipesData.js";
import { recipesFactory } from "../factories/recipesFactories.js";
import { updateList } from "../utils/menu.js";

const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("main-search-input");
searchBar.addEventListener("keyup", (e) => {
  filter(e.target);
});

const recipes = getRecipes();
const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getUstensils();
let recipesListInput = [];
let recipesListMenu = [];
let selectedItems = [];

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
        if (recipesListInput.length === 0) {
          recipesListInput.push(recipe);
        } else {
          recipesListInput.forEach((recipeList) => {
            recipeList.id === recipe.id ? (findRecipe = true) : null;
          });
          findRecipe ? "" : recipesListInput.push(recipe);
        }
      }

      if (recipe.description.toLowerCase().includes(research)) {
        if (recipesListInput.length === 0) {
          recipesListInput.push(recipe);
        } else {
          recipesListInput.forEach((recipeList) => {
            recipeList.id === recipe.id ? (findRecipe = true) : null;
          });
          findRecipe ? "" : recipesListInput.push(recipe);
        }
      }

      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(research)) {
          if (recipesListInput.length === 0) {
            recipesListInput.push(recipe);
          } else {
            recipesListInput.forEach((recipeList) => {
              recipeList.id === recipe.id ? (findRecipe = true) : null;
            });
            findRecipe ? "" : recipesListInput.push(recipe);
          }
        }
      });
    });
    refresh = true;
    buildRecipesDom(recipesListInput);
    updateList(recipesListInput)
    return;
  }
  if (refresh && searchBar.value.length < 3) {
    cardContainer.removeChild(cardContainer.children[0]);
    refresh = false;
    recipesListInput = [];
    updateList(recipes)
  }
  buildRecipesDom(menuFilter(selectedItems, true));
}

export function menuFilter(newSelectedItems, deleteItems) {
  //debugger
  let recipesFilter = [];
  newSelectedItems ? (selectedItems = newSelectedItems) : null;

  let recipesListMenuFilter = [];
  deleteItems ? (recipesListMenu = []) : null;
  let NotfindRecipe = false;

  selectedItems.forEach(function callback(item, index) {
    let { content, type } = item;

    content = content.toLowerCase();

    if (recipesListInput.length > 0) {
      recipesFilter = recipesListInput;
    } else {
      recipesListMenu.length === 0 ? (recipesFilter = recipes) : (recipesFilter = recipesListMenu);
    }

    recipesFilter.forEach((recipe) => {
      //debugger
      let findRecipe = false;

      if (type === "appliance") {
        if (recipe[type].toLowerCase().includes(content)) {
          if (index > 0 && recipe[type].toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "appliance") {
            recipesListMenuFilter.push(recipe);
            NotfindRecipe = true;
          } else {
            if (recipesListMenu.length === 0) {
              recipesListMenu.push(recipe);
            } else {
              recipesListMenu.forEach((recipeList) => {
                recipeList.id === recipe.id ? (findRecipe = true) : null;
              });
              findRecipe ? "" : recipesListMenu.push(recipe);
            }
          }
        }
      } else if (type === "ingredient") {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toLowerCase().includes(content)) {
            if (index > 0 && ingredient.ingredient.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "ingredient") {
              recipesListMenuFilter.push(recipe);
              NotfindRecipe = true;
            } else {
              if (recipesListMenu.length === 0) {
                recipesListMenu.push(recipe);
              } else {
                recipesListMenu.forEach((recipeList) => {
                  recipeList.id === recipe.id ? (findRecipe = true) : null;
                });
                findRecipe ? "" : recipesListMenu.push(recipe);
              }
            }
          }
        });
      } else {
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil.toLowerCase().includes(content)) {
            if (index > 0 && ustensil.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === "ustensil") {
              recipesListMenuFilter.push(recipe);
              NotfindRecipe = true;
            } else {
              if (recipesListMenu.length === 0) {
                recipesListMenu.push(recipe);
              } else {
                recipesListMenu.forEach((recipeList) => {
                  recipeList.id === recipe.id ? (findRecipe = true) : null;
                });
                findRecipe ? "" : recipesListMenu.push(recipe);
              }
            }
          }
        });
      }
    });
  });
  recipesListMenuFilter.length > 0 ? (recipesListMenu = recipesListMenuFilter) : null;
  if (selectedItems.length === 0) {
    recipesListMenu = [];
    return recipes;
  }
  if (selectedItems.length > 1 && NotfindRecipe === false) {
    recipesListMenu = [];
  }
  return recipesListMenu;
}

buildRecipesDom();
filter();
