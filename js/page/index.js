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
  let length = 0;
  research ? (length = research.value.length) : "";
  research ? (research = research.value.toLowerCase()) : "";
  let recipesList = [];

  if (length >= 3) {
    recipes.forEach((recipe) => {
      if (recipe.name.toLowerCase().includes(research)) {
        
        recipesList.length === 0 ? recipesList.push(recipe) : "";

        recipesList.forEach((recipeList) => {
          debugger
          if (!(recipeList === recipe)) {
            console.log(recipeList.id, recipe.id, recipeList.id === recipe.id);
            recipesList.push(recipe);
          }
        });
      }


      // SlitedTitle.forEach((word) => {
      //   if (word.substring(0, length).toUpperCase() === value) {
      // if (recipesList.length === 0) {
      //   recipesList.push(recipe);
      // } else {
      //   recipesList.forEach((recip) => {
      //     console.log(recip.id , recipe.id, recip.id != recipe.id);
      //     if (recip.id != recipe.id) {
      //       recipesList.push(recipe);
      //     }
      //   });
      // }
      //   }
      // });

      // let SlitedDescription = recipe.name.split(" ");
      // SlitedDescription.forEach((word) => {
      //   if (word.substring(0, length).toUpperCase() === value) {
      //     if (recipesList.length === 0) {
      //       recipesList.push(recipe);
      //     } else {
      //       recipesList.forEach((recip) => {
      //         if (recip.id != recipe.id) {
      //           recipesList.push(recipe);
      //         }
      //       });
      //     }
      //   }
      // });

      // recipe.ingredients.forEach((ingredient) => {
      //   let SlitedIngredient = ingredient.ingredient.split(" ");
      //   SlitedIngredient.forEach((word) => {
      //     if (word.substring(0, length).toUpperCase() === value) {
      //       if (recipesList.length === 0) {
      //         recipesList.push(recipe);
      //       } else {
      //         recipesList.forEach((recip) => {
      //           if (recip.id != recipe.id) {
      //             recipesList.push(recipe);
      //           }
      //         });
      //       }
      //     }
      //   });
      // });
    });
    console.log(recipesList);
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
