export function buttonFactory(text, type) {
  let button = document.createElement("button");
  button.classList.add("button");
  if (type === "ingredient-choice") {
    button.classList.add("btn-ingredient");
  }else{
    type === "appliance-choice" ? button.classList.add("btn-device") : button.classList.add("btn-ustensil");
  }

  button.textContent = text + " ";
  let i = document.createElement("i");
  i.classList.add("fa-regular");
  i.classList.add("fa-circle-xmark");
  button.appendChild(i);
  i.addEventListener("click", () => {
    console.log("fermer");
  });
  return button;
}
