import { getAppliances, getIngredients, getRecipes, getUstensils } from "../../data/recipesData.js";
import { recipesFactory } from "../factories/recipesFactories.js";

const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("main-search-input");
searchBar.addEventListener("keyup", ()=> {
  const value = searchBar.value;
  filter(value);
});

const recipes = [
  {
    id: 40,
    name: "Limonade",
    servings: 4,
    ingredients: [
      {
        ingredient: "Eau",
        quantity: 1,
        unit: "Litres",
      },
      {
        ingredient: "Citron Vert",
        quantity: 3,
      },
      {
        ingredient: "Sucre en poudre",
        quantity: 4,
        unit: "cuillères à café",
      },
      {
        ingredient: "Bicarbonate",
        quantity: 1,
        unit: "cuillères à café",
      },
    ],
    time: 10,
    description:
      "Dans un saladier mettre l'eau, le jus des citrons et le sucre. Bien mélanger. Ajouter le bicarbonate. Servir. Ajouter des glaçon et une feuille de menthe pour la déco.",
    appliance: "Saladier",
    ustensils: ["cuillère en bois"],
  },
  {
    id: 41,
    name: "Mousse au chocolat",
    servings: 4,
    ingredients: [
      {
        ingredient: "Oeuf",
        quantity: 3,
      },
      {
        ingredient: "Chocolat noir",
        quantity: 100,
        unit: "grammes",
      },
      {
        ingredient: "Sucre vanillé",
        quantity: 1,
        unit: "sachets",
      },
    ],
    time: 20,
    description:
      "Séparer les blancs d'oeufs. Faire fondre le chocolat au bain marie. Ajouter les jaunes et le sucre au chocolat hors du feu. Battre les blancs en neige. Ajouter les blancs au mélange de chocolat. Mélangez délicatement avec une spatule. Servir dans un plat ou dans des verres. Mettre au frais",
    appliance: "Casserole",
    ustensils: ["fouet", "spatule", "verres"],
  },
  {
    id: 1,
    name: "Limonade de Coco",
    servings: 1,
    ingredients: [
      {
        ingredient: "Lait de coco",
        quantity: 400,
        unit: "ml",
      },
      {
        ingredient: "Jus de citron",
        quantity: 2,
      },
      {
        ingredient: "Crème de coco",
        quantity: 2,
        unit: "cuillères à soupe",
      },
      {
        ingredient: "Sucre",
        quantity: 30,
        unit: "grammes",
      },
      {
        ingredient: "Glaçons",
      },
    ],
    time: 10,
    description:
      "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
    appliance: "Blender",
    ustensils: ["cuillère à Soupe", "verres", "presse citron"],
  },
]
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

function filter(value) {
  value = value.toUpperCase();
  let recipesList = [];
  let length = value.length;

  if (length >= 3) {
    

    recipes.forEach((recipe) => {
      let SlitedTitle = recipe.name.split(" ");
      SlitedTitle.forEach((word) => {
        if (word.substring(0, length).toUpperCase() === value) {
          if (recipesList.length === 0) {
            recipesList.push(recipe);
          } else {
            recipesList.forEach((recip) => {
              console.log(recip.id , recipe.id, recip.id != recipe.id);
              if (recip.id != recipe.id) {
                recipesList.push(recipe);
              }
            });
          }
        }
      });

      let SlitedDescription = recipe.name.split(" ");
      SlitedDescription.forEach((word) => {
        if (word.substring(0, length).toUpperCase() === value) {
          if (recipesList.length === 0) {
            recipesList.push(recipe);
          } else {
            recipesList.forEach((recip) => {
              if (recip.id != recipe.id) {
                recipesList.push(recipe);
              }
            });
          }
        }
      });

      recipe.ingredients.forEach((ingredient) => {
        let SlitedIngredient = ingredient.ingredient.split(" ");
        SlitedIngredient.forEach((word) => {
          if (word.substring(0, length).toUpperCase() === value) {
            if (recipesList.length === 0) {
              recipesList.push(recipe);
            } else {
              recipesList.forEach((recip) => {
                if (recip.id != recipe.id) {
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
