import { Recipe } from "../domain/recipe.ts";
import { RecipeList } from "../domain/recipelist.ts";

const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;
const inpName = document.getElementById(
  "inp-name",
) as HTMLInputElement | null;
const inpTiempo = document.getElementById(
  "inp-tiempo",
) as HTMLInputElement | null;
const inpCategory = document.getElementById(
  "inp-category",
) as HTMLSelectElement | null;
const inpDescripcion = document.getElementById(
  "inp-Descripcion",
) as HTMLInputElement | null;

const mainRecipeList = new RecipeList();

if (btnAdd && inpName && inpCategory && inpDescripcion && inpTiempo) {
  btnAdd.addEventListener("click", () => {
    const recipesErrorContainer = document.getElementById("add-recipes-error");
    const recipesError = document.getElementById("add-recipes-error-msg");
    try {
      const newRecipe = new Recipe(inpName.value);
      newRecipe.category = inpCategory.value;
      newRecipe.descripcion= inpDescripcion.value;
      newRecipe.tiempo= parseInt(inpTiempo.value);
      mainRecipeList.add(newRecipe);
      clearInputs(inpName, inpCategory, inpDescripcion, inpTiempo);
      recipesErrorContainer?.classList.add("d-none");
      loadRecipeList(newRecipe);
      appendAlert(`${newRecipe.name} agregada correctamente!`, "success");
    } catch (error) {
      recipesErrorContainer?.classList.remove("d-none");
      if (recipesError) {
        if (error instanceof Error) {
          recipesError.innerText = error.message;
        } else {
          recipesError.innerText = String(error);
        }
      }
    }
  });
}

function clearInputs(
  inpNameEl: HTMLInputElement,
  inpCategoryEl: HTMLSelectElement,
  inpDescripcionE1: HTMLInputElement,
  inpTiempoE1: HTMLInputElement 
) {
  inpNameEl.value = "";
  inpCategoryEl.selectedIndex = 0;
  inpDescripcionE1.value = ""; 
  inpTiempoE1.value = ""; 
 
}

function loadRecipeList(newRecipe: Recipe) {
  const recipesList = document.getElementById("recipes-list");
  const recipesContainer = document.getElementById("recipes");
  const emptyList = document.getElementById("empty-list");

  emptyList?.classList.add("d-none");
  recipesContainer?.classList.remove("d-none");
  if (recipesList) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerText = newRecipe.toString();
    recipesList.appendChild(li);
  }
}

const alertPlaceholder = document.getElementById("alerts");
const appendAlert = (message: string, type: "success" | "danger") => {
  if (!alertPlaceholder) return;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible pe-4" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  if (type === "success") {
    setTimeout(() => {
      const alert = wrapper.querySelector(".alert");
      if (alert) {
        alert.classList.remove("show");
        alert.classList.add("fade");
        setTimeout(() => wrapper.remove(), 150);
      }
    }, 3000);
  }
};
