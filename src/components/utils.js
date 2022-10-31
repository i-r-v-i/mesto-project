import {
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupProfile,
  formProfile,
  elements
} from "./data.js";
import { openPopup } from "./modal.js";
import { checkInputValidity } from "./validate.js";
// import {  } from "./api.js";


// заполнение полей профиля
export function setInfoInProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup('popup__title');
  checkInputValidity(formProfile, nameInput, elements);
  checkInputValidity(formProfile, jobInput, elements);
}
