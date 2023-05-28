import { getRecipes } from "../../data/recipesData.js";
import { recipesFactory } from "../factories/recipesFactories.js";
import { updateList, deleteItem } from "../utils/menu.js";

const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("main-search-input");
const recipes = getRecipes();
let recipesListInput = [];
let recipesListMenu = [];
let selectedItems = [];
let refresh = false;


searchBar.addEventListener("keyup", (e) => {
  buildRecipesDom(filter(e.target));
  refresh === true ? updateList(recipesListInput) : null;
  if (refresh && searchBar.value.length < 3) {
    cardContainer.removeChild(cardContainer.children[0]);
    refresh = false;
    recipesListInput = [];
    updateList(recipes)
    buildRecipesDom(menuFilter(selectedItems, true));
  }
});


export function buildRecipesDom(recipesDom) {
  console.log("🚀 ~ file: index.js:28 ~ buildRecipesDom ~ recipesDom:", recipesDom)
  let div = document.createElement("div");
  div.classList.add("card-container");
  if (recipesDom) {
    cardContainer.innerHTML = "";
    recipesDom.forEach((recipe) => {
      div.appendChild(recipesFactory(recipe));
    });
    cardContainer.appendChild(div);
  } else {
    cardContainer.innerHTML = "";
    recipes.forEach((recipe) => {
      let recipeDOM = recipesFactory(recipe);
      div.appendChild(recipeDOM);
    });
    cardContainer.appendChild(div);
  }
}

export function filter(research) {

  if(selectedItems.length > 0) {
    deleteItem('all')
    selectedItems = []
  }


  recipesListInput = []
  let length = 0;
  research ? (length = research.value.length) : "";
  research ? (research = research.value.toLowerCase()) : "";

  if (length >= 3) {
    for (let i = 0; i < recipes.length; i++) {
      let findRecipe = false


      if (recipes[i].name.toLowerCase().includes(research) || recipes[i].description.toLowerCase().includes(research)) {
        if (recipesListInput.length === 0) {
          recipesListInput.push(recipes[i]);
        }else{
          for (let j = 0; j < recipesListInput.length; j++) {
            recipesListInput[j].id === recipes[i].id ?  findRecipe = true : null;
          }
          findRecipe ? '' : recipesListInput.push(recipes[i]);
        }
      }else {
        for (let k = 0; k < recipes[i].ingredients.length; k++) {
          if (recipes[i].ingredients[k].ingredient.toLowerCase().includes(research)) {
            if (recipesListInput.length === 0) {
              recipesListInput.push(recipes[i]);
            }else{
              for (let j = 0; j < recipesListInput.length; j++) {
                recipesListInput[j].id === recipes[i].id ?  findRecipe = true : null;
              }
              findRecipe ? '' : recipesListInput.push(recipes[i]);
            }
          }
        }
      }
      findRecipe === false ? "" : recipesListInput.push(recipes[i]) ;
    }
    refresh = true;
    return recipesListInput;
  }
    
}

export function menuFilter(newSelectedItems, deleteItems) {
  let recipesFilter = [];
  newSelectedItems ? (selectedItems = newSelectedItems) : null;
 
  let recipesListMenuFilter = [];
  if(deleteItems === true) {
    if(selectedItems.length === 0 && recipesListInput.length > 0) {
      return recipesListInput
    }
    if(newSelectedItems.length === 0 && recipesListInput.length === 0){
      return recipes
    }
    if(recipesListInput.length === 0){
      recipesListMenu = []
    }
    else{
      recipesListMenu = recipesListInput
    }
  }
  let NotfindRecipe = false;

  selectedItems.forEach(function callback(item, index) {
    let { content, type } = item;

    content = content.toLowerCase();

    if(recipesListInput.length > 0 && selectedItems.length > 0){
      recipesFilter = recipesListInput
      recipesListMenu = []
    }
    else if (recipesListInput.length > 0 && deleteItems === false) {
      recipesFilter = recipesListInput;
    } else if (recipesListInput.length === 0 && selectedItems.length === 1 &&  recipesListInput.length === 0) {
      recipesFilter = recipes;
      recipesListMenu = []
    }
     else {
      recipesListMenu.length === 0 ? (recipesFilter = recipes) : (recipesFilter = recipesListMenu);
    }

    recipesFilter.forEach((recipe) => {
      if (type === "appliance") {
        menuFilterHelper(recipe.appliance, recipe, type, content, selectedItems, index, recipesListMenuFilter, NotfindRecipe, recipesListMenu)
      } else if (type === "ingredient") {
        recipe.ingredients.forEach((ingredient) => {
          menuFilterHelper(ingredient.ingredient, recipe, type, content, selectedItems, index, recipesListMenuFilter, NotfindRecipe, recipesListMenu)
        });
      } else {
        //debugger
        recipe.ustensils.forEach((ustensil) => {
          menuFilterHelper(ustensil, recipe, type, content, selectedItems, index, recipesListMenuFilter, NotfindRecipe, recipesListMenu)
        });
      }
    });
  });
  if(recipesListMenuFilter.length > 0) {
    recipesListMenu = recipesListMenuFilter
     return recipesListMenu 
    }
  if (selectedItems.length === 0) {
    recipesListMenu = [];
    return recipes;
  }
  if (selectedItems.length > 1 && NotfindRecipe === false) {recipesListMenu = [];}
  return recipesListMenu;
}

function menuFilterHelper(recipeObject, recipe, type, content, selectedItems, index, recipesListMenuFilter, NotfindRecipe, recipesListMenu){
  if (recipeObject.toLowerCase().includes(content)) {
    if (index > 0 && recipeObject.toLowerCase() === content && selectedItems[selectedItems.length - 1].type === type) {
      recipesListMenuFilter.push(recipe);
      NotfindRecipe = true;
    } else {
      if (recipesListMenu.length === 0) {
        recipesListMenu.push(recipe);
      } else {
        let result = recipesListMenu.find(recipeListMenu => recipeListMenu.id === recipe.id)
        result ? null : recipesListMenu.push(recipe)
      }
    }
  }
}


buildRecipesDom();
filter();
