import {deleteItem} from './../utils/menu.js'
export function buttonFactory(text, type) {
  let button = document.createElement("span");
  button.classList.add("button");
  if (type === "ingredient") {
    button.classList.add("btn-ingredient");
  }else{
    type === "appliance" ? button.classList.add("btn-device") : button.classList.add("btn-ustensil");
  }

  button.textContent = text + " ";
  let buttonIcon = document.createElement("button");
  let i = document.createElement("i");
  buttonIcon.classList.add("button-icon");
  i.classList.add("fa-regular");
  i.classList.add("fa-circle-xmark");
  buttonIcon.appendChild(i)
  button.appendChild(buttonIcon);
  i.addEventListener("click", () => {
    deleteItem(i.parentElement.parentElement.innerText, true);
  });
  return button;
}
