import { getIngredients, getAppliances, getUstensils } from "../../data/recipesData.js";

export function menuList (type) {
    let typeList = [];

    if(type === 'ingredient'){
        typeList = getIngredients()
    }
    else if(type === 'appliance'){
        typeList = getAppliances()
    } else if(type === 'ustensil'){
        typeList = getUstensils()
    }
    typeList.sort();
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let ul1 = document.createElement("ul");
    let ul2 = document.createElement("ul");
    let ul3 = document.createElement("ul");
    div1.classList.add("col-4");
    div2.classList.add("col-4");
    div3.classList.add("col-4");
    div1.appendChild(ul1);
    div2.appendChild(ul2);
    div3.appendChild(ul3);
    let ulTab = [ul1,ul2,ul3];
    
    let i = -1;
  
    typeList.forEach((item) => {
      i++
      i === 3 ? i=0 : "";
        ulTab[i].innerHTML += `<li><a href="#" data-value="${item}">${item}<a></li>`;
    })
  
return [div1, div2, div3]
}