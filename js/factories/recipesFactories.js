

// <div class="card">
// <canvas width="380" height="178"
//     style="width: 380px; height: 178; background-color: lightgray;"></canvas>
// <div class="card-text">
//     <div class="card-left">
//         <div class="card-title">Limonade de Coco</div>
//         <div class="card-recette">
//             <span><strong>Lait de coco:</strong> 400ml</span>
//             <span><strong>Jus de citron:</strong> 2</span>
//             <span><strong>Créme de coco:</strong> 4</span>
//             <span><strong>cuillères Sucre:</strong> 20g</span>
//             <span><strong>Glaçons:</strong> 2</span>
//         </div>
//     </div>
//     <div class="card-right">
//         <div class="card-duration"><i class="fa-regular fa-clock"></i> 10 min</div>
//         <div class="card-description">Mettre les glaçons à votre goût dans le blender, ajouter le lait,
//             la crème
//             de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée.
//         </div>
//     </div>
// </div>
// </div>




export function recipesFactory(recipe) {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `<canvas width="380" height="178" style="width: 380px; height: 178; background-color: lightgray;"></canvas>`;

  let divCardtext = document.createElement("div");
  divCardtext.classList.add("card-text");

  let div2 = document.createElement("div");
  div2.classList.add("card-left");
  divCardtext.appendChild(div2);

  let div3 = document.createElement("div");
  div3.classList.add("card-recette");
  let div4 = document.createElement("div");
  div4.classList.add("card-title");
  div4.innerHTML = recipe.name;
  div2.appendChild(div4);
  div2.appendChild(div3)

  let div5 = document.createElement("div");
  div5.classList.add("card-recette");
  recipe.ingredients.forEach((ingredient) => {
    let span = document.createElement('span')
    span.innerHTML = ` <strong>${ingredient.ingredient}:</strong>  ${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ''}`
    
    div5.appendChild(span)
  });
  div3.appendChild(div5);

  let div6 = document.createElement("div");
  div6.classList.add("card-right");

  let div7 = document.createElement("div");
  div7.classList.add("card-duration");
  div7.innerHTML =  ` <strong><i class="fa-regular fa-clock"></i>  ${recipe.time} </strong>`

  let div8 = document.createElement("div");
  div8.classList.add("card-description");
  div8.innerText = recipe.description
  div6.appendChild(div7)
  div6.appendChild(div8)
  divCardtext.appendChild(div6)
  div.appendChild(divCardtext)

  return div
}
