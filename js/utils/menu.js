import { getIngredients, getAppliances, getUstensils } from "../../data/recipesData.js";
import { buttonFactory } from "../../js/factories/buttonFactories.js";
import { menuFilter } from "../../js/page/index.js";

const btnIngredient = document.getElementById("btn-ingredient");
const ListIngredient = document.getElementById("ingredient-list");
const ListIngredientHide = document.getElementById("ingredient-list-hide");

const btnAppliance = document.getElementById("btn-appliance");
const ListAppliance = document.getElementById("appliance-list");
const ListApplianceHide = document.getElementById("appliance-list-hide");

const btnUstensil = document.getElementById("btn-ustensil");
const ListUstensil = document.getElementById("ustensil-list");
const ListUstensilHide = document.getElementById("ustensil-list-hide");

const ingredientChoice = document.getElementById("ingredient-choice");
const applianceChoice = document.getElementById("appliance-choice");
const ustensilChoice = document.getElementById("ustensil-choice");

const btnContainer = document.querySelector(".button-container");

const selectedItem = document.querySelector(".selected-item");

btnIngredient.addEventListener("click", hide);
ListIngredientHide.addEventListener("click", hideList);
let ItemsSelected = []

function hide() {
  btnIngredient.classList.add("d-none");
  ListIngredient.style.display = "block";
  hideListAppliance();
  hideListUstensil();
}

function hideList() {
  btnIngredient.classList.remove("d-none");
  ListIngredient.style.display = "none";
}

btnAppliance.addEventListener("click", hideAppliance);
ListApplianceHide.addEventListener("click", hideListAppliance);
document.addEventListener("click", hideListMenu);

function hideListMenu() {
  if (ListIngredient.style.display === "block" || ListAppliance.style.display === "block" || ListUstensil.style.display === "block") {
    document.addEventListener("click", (e)=>{
      btnContainer.contains(e.target) ? "" : closeAllLists();
    });
  }
}

function hideAppliance() {
  btnAppliance.classList.add("d-none");
  ListAppliance.style.display = "block";
  hideList();
  hideListUstensil();
}

function hideListAppliance() {
  btnAppliance.classList.remove("d-none");
  ListAppliance.style.display = "none";
}

btnUstensil.addEventListener("click", hideUstensil);
ListUstensilHide.addEventListener("click", hideListUstensil);

ListAppliance.addEventListener("click", (e)=>{showItemdMenu(e)});
ListIngredient.addEventListener("click", (e)=>{showItemdMenu(e)});
ListUstensil.addEventListener("click", (e)=>{showItemdMenu(e)});

function hideUstensil() {
  btnUstensil.classList.add("d-none");
  ListUstensil.style.display = "block";
  hideList();
  hideListAppliance();
}

function hideListUstensil() {
  btnUstensil.classList.remove("d-none");
  ListUstensil.style.display = "none";
}

document.addEventListener("keyup", close);
function close(e) {
  if (e.key == "Escape") {
    hideList();
    hideListAppliance();
    hideListUstensil();
  }
}

function ingredientList() {
  const ingredientList = getIngredients();
  let compteur = 0;
  for (let j = 0; j < 3; j = j + 1) {
    let div = document.createElement("div");
    div.classList.add("col-4");
    let ul = document.createElement("ul");
    div.appendChild(ul);
    for (let i = 0; i < 42; i = i + 1) {
      if (compteur < ingredientList.length) {
        let li = document.createElement("li");
        li.innerText = ingredientList[0];
        ul.appendChild(li);
        ingredientList.splice(0, 1);
      }
    }
    ingredientChoice.appendChild(div);
  }
}

function applianceList() {
  const applianceList = getAppliances();
  let compteur = 0;
  for (let j = 0; j < 3; j = j + 1) {
    let div = document.createElement("div");
    div.classList.add("col-4");
    let ul = document.createElement("ul");
    div.appendChild(ul);
    for (let i = 0; i < 4; i = i + 1) {
      if (compteur < applianceList.length) {
        let li = document.createElement("li");
        li.innerText = applianceList[0];
        ul.appendChild(li);
        applianceList.splice(0, 1);
      }
    }
    applianceChoice.appendChild(div);
  }
}

function ustensilList() {
  const ustensilList = getUstensils();
  let compteur = 0;
  for (let j = 0; j < 3; j = j + 1) {
    let div = document.createElement("div");
    div.classList.add("col-4");
    let ul = document.createElement("ul");
    div.appendChild(ul);
    for (let i = 0; i < 10; i = i + 1) {
      if (compteur < ustensilList.length) {
        let li = document.createElement("li");
        li.innerText = ustensilList[0];
        ul.appendChild(li);
        ustensilList.splice(0, 1);
      }
    }
    ustensilChoice.appendChild(div);
  }
}

function closeAllLists() {
  hideList();
  hideListAppliance();
  hideListUstensil();
}

function showItemdMenu (item) {
 
  let findItem = true
  if(item.target.nodeName === 'LI') {

    let type = item.target.parentElement.parentElement.parentElement.getAttribute("id")
    let content = item.target.innerText

    if (ItemsSelected.length === 0){

      ItemsSelected.push({content,type});
      selectedItem.appendChild(buttonFactory(content, type));
      menuFilter(ItemsSelected)
    }else {
      ItemsSelected.forEach(ItemSelected => {
        if(ItemSelected.content === content){
          findItem = false;
        }
      })
      if(findItem){
        ItemsSelected.push({content,type});
        selectedItem.appendChild(buttonFactory(content, type));
        menuFilter(ItemsSelected)
      }
    }
  }
}

ingredientList();
ustensilList();
applianceList();
