import { getIngredients, getAppliances, getUstensils, getRecipes } from '../../data/recipesData.js';
import { buttonFactory } from '../../js/factories/buttonFactories.js';
import { menuList } from '../../js/factories/menuListFactories.js';
import { menuFilter, buildRecipesDom } from '../../js/page/index.js';

const btnIngredient = document.getElementById('btn-ingredient');
const ListIngredient = document.getElementById('ingredient-list');
const ListIngredientHide = document.getElementById('ingredient-list-hide');

const btnAppliance = document.getElementById('btn-appliance');
const ListAppliance = document.getElementById('appliance-list');
const ListApplianceHide = document.getElementById('appliance-list-hide');

const btnUstensil = document.getElementById('btn-ustensil');
const ListUstensil = document.getElementById('ustensil-list');
const ListUstensilHide = document.getElementById('ustensil-list-hide');

const ingredientChoice = document.getElementById('ingredient-choice');
const applianceChoice = document.getElementById('appliance-choice');
const ustensilChoice = document.getElementById('ustensil-choice');

const btnContainer = document.querySelector('.button-container');

const selectedItem = document.querySelector('.selected-item');

const menuInputs = Array.from(document.querySelectorAll('.dropdown-list-input'));

let ModifiedMenu = false;

menuInputs.forEach((menuInput) => {
  menuInput.addEventListener('keyup', (e) => {
    searchMenu(e);
  });
});

btnIngredient.addEventListener('click', hide);
ListIngredientHide.addEventListener('click', hideList);
let itemsSelected = [];

function hide() {
  btnIngredient.classList.add('d-none');
  ListIngredient.style.display = 'block';
  hideListAppliance();
  hideListUstensil();
}

function hideList() {
  btnIngredient.classList.remove('d-none');
  ListIngredient.style.display = 'none';
}

btnAppliance.addEventListener('click', hideAppliance);
ListApplianceHide.addEventListener('click', hideListAppliance);
document.addEventListener('click', hideListMenu);

function hideListMenu() {
  if (ListIngredient.style.display === 'block' || ListAppliance.style.display === 'block' || ListUstensil.style.display === 'block') {
    document.addEventListener('click', (e) => {
      btnContainer.contains(e.target) ? '' : closeAllLists();
    });
  }
}

function hideAppliance() {
  btnAppliance.classList.add('d-none');
  ListAppliance.style.display = 'block';
  hideList();
  hideListUstensil();
}

function hideListAppliance() {
  btnAppliance.classList.remove('d-none');
  ListAppliance.style.display = 'none';
}

btnUstensil.addEventListener('click', hideUstensil);
ListUstensilHide.addEventListener('click', hideListUstensil);

ListAppliance.addEventListener('click', (e) => {
  showItemdMenu(e);
});
ListIngredient.addEventListener('click', (e) => {
  showItemdMenu(e);
});
ListUstensil.addEventListener('click', (e) => {
  showItemdMenu(e);
});

function hideUstensil() {
  btnUstensil.classList.add('d-none');
  ListUstensil.style.display = 'block';
  hideList();
  hideListAppliance();
}

function hideListUstensil() {
  btnUstensil.classList.remove('d-none');
  ListUstensil.style.display = 'none';
}

document.addEventListener('keyup', close);
function close(e) {
  if (e.key == 'Escape') {
    hideList();
    hideListAppliance();
    hideListUstensil();
  }
}

function ingredientList() {
  let listsElement = menuList('ingredient');
  listsElement.forEach((listElement) => {
    ingredientChoice.appendChild(listElement);
  });
}

function applianceList() {
  let listsElement = menuList('appliance');
  listsElement.forEach((listElement) => {
    applianceChoice.appendChild(listElement);
  });
}

function ustensilList() {
  let listsElement = menuList('ustensil');
  listsElement.forEach((listElement) => {
    ustensilChoice.appendChild(listElement);
  });
}

function closeAllLists() {
  hideList();
  hideListAppliance();
  hideListUstensil();
}

function showItemdMenu(item) {
  let findItem = true;
  if (item.target.nodeName === 'A') {
    let type = item.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    type = type.split('-');
    type = type[0];
    let content = item.target.innerText;

    if (itemsSelected.length === 0) {
      showItemdMenuHelper(content, type);
    } else {
      itemsSelected.forEach((ItemSelected) => {
        if (ItemSelected.content === content) {
          findItem = false;
        }
      });
      if (findItem) {
        showItemdMenuHelper(content, type);
      }
    }
  }
}

function showItemdMenuHelper(content, type) {
  itemsSelected.push({ content, type });
  selectedItem.appendChild(buttonFactory(content, type));
  let newRecipesList = menuFilter(itemsSelected, false);
  buildRecipesDom(newRecipesList);
  updateList(newRecipesList);
}

export function deleteItem(item) {
  if (item === 'all') {
    selectedItem.innerHTML = '';
    itemsSelected = []
  } else {
    let childrens = selectedItem.children;

    for (var i = 0; i < childrens.length; i++) {
      let childrenContent = childrens[i].innerText;
      if (childrenContent === item) {
        selectedItem.removeChild(childrens[i]);
        let el = itemsSelected.indexOf(childrenContent);
        itemsSelected.splice(el, 1);
      }
    }
    if (itemsSelected.length === 0) {
      let newRecipesList = menuFilter(itemsSelected, true);
      if (newRecipesList.length > 0) {
        buildRecipesDom(newRecipesList);
        updateList(newRecipesList);
      } else {
        buildRecipesDom();
        updateList(getRecipes());
      }
    } else {
      let newRecipesList = menuFilter(itemsSelected, true);
      buildRecipesDom(newRecipesList);
      updateList(newRecipesList);
    }
  }
}

function searchMenu(e) {
  let type = e.target.parentElement.parentElement.parentElement.getAttribute('id');
  let content = e.target.value;
  type = type.split('-');
  type = type[0];
  let list = [];
  let nodeList = [];
  let filteredList = [];
  if (content.length >= 3) {
    if (type === 'ingredient') {
      list = getIngredients();
      list.forEach((item) => {
        item.toLowerCase().includes(content) ? filteredList.push(item) : '';
      });
      populateLists(ingredientChoice, filteredList);
      ModifiedMenu = true;
    } else if (type === 'appliance') {
      list = getAppliances();
      list.forEach((item) => {
        item.toLowerCase().includes(content) ? filteredList.push(item) : '';
      });
      populateLists(applianceChoice, filteredList);
      ModifiedMenu = true;
    } else if (type === 'ustensil') {
      list = getUstensils();
      list.forEach((item) => {
        item.toLowerCase().includes(content) ? filteredList.push(item) : '';
      });
      populateLists(ustensilChoice, filteredList);
      ModifiedMenu = true;
    }
  }

  if (ModifiedMenu === true && content.length < 3) {
    if (type === 'ingredient') {
      populateLists(ingredientChoice, getIngredients());
    } else if (type === 'appliance') {
      populateLists(applianceChoice, getAppliances());
    } else if (type === 'ustensil') {
      populateLists(ustensilChoice, getUstensils());
    }
    ModifiedMenu = false;
  }
}

function populateLists(DOMelement, list) {
  DOMelement.innerHTML = '';
  let nodeList = menuList(list);
  nodeList.forEach((node) => {
    DOMelement.appendChild(node);
  });
}

export function updateList(list) {
  let ingredientList = [];
  let applianceList = [];
  let ustensilList = [];
  list.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredientList.find((ing) => ing === ingredient.ingredient)) {
        ingredientList.push(ingredient.ingredient);
      }
    });
  });
  ingredientList.sort();
  populateLists(ingredientChoice, ingredientList);

  list.forEach((recipe) => {
    if (!applianceList.find((appliance) => appliance === recipe.appliance)) {
      applianceList.push(recipe.appliance);
    }
  });
  applianceList.sort();
  populateLists(applianceChoice, applianceList);

  list.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensilList.find((el) => el === ustensil)) {
        ustensilList.push(ustensil);
      }
    });
  });
  ustensilList.sort();
  populateLists(ustensilChoice, ustensilList);
}

// function sorter (list, key) {
//   let sortedList = [];
//   list.forEach((recipe) => {
//     recipe.ingredients.forEach((ingredient) => {
//       if (!ingredientList.find((ing) => ing === ingredient.ingredient)) {
//         sortedList.push(ingredient.ingredient);
//       }
//     });
//   });
//   sortedList.sort();
//   return sortedList;
// }

ingredientList();
ustensilList();
applianceList();
