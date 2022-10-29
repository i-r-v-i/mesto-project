import {
  nameInput,
  jobInput,
  profileName,
  profileAvatar,
  avatarInput,
  profileJob,
  popupProfile,
  formProfile,
  elements,
  popupForAvatar,
} from "./data.js";
import { openPopup, closePopup } from "./modal.js";
import { checkInputValidity, enableValidation } from "./validate.js";
import { editProfile, getInfoProfile, editAvatar } from "./api.js";


// заполнение полей профиля
export function setInfoInProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  checkInputValidity(formProfile, nameInput, elements);
  checkInputValidity(formProfile, jobInput, elements);
}

// export let userId = null;

// //получение данных профиля с сервера
// export function setInfoProfileFromServer() {
// getInfoProfile()
// .then((userInfoFromServer) => {
//   profileName.textContent = userInfoFromServer.name;
//   profileJob.textContent = userInfoFromServer.about;
//   profileAvatar.src = userInfoFromServer.avatar;
//   userId = userInfoFromServer._id;
// })
// .catch((err) => {
//   console.log(
//     `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
//   );
//   })
// }
// // Обработчик отправки формы редактирования профиля
// export function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   editProfile({name: nameInput.value, about: jobInput.value})
//   .then(() => {
//     setInfoProfileFromServer();
//     closePopup(popupProfile);
//     })
//     // profileName.textContent = dataFromServer.name;
//     // profileJob.textContent = dataFromServer.about;
//     // console.log(dataFromServer);
//     // closePopup(popupProfile);
  
//   .catch((err) => {
//     console.log(
//       `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
//     );
//     })
// }

// export function handleAvatarFormSubmit(evt) {
//   evt.preventDefault();
//   editAvatar({avatar: avatarInput.value})
//   .then(() => {
//     setInfoProfileFromServer();
//     closePopup(popupForAvatar);
//     evt.target.reset();
//     enableValidation(elements);
//   })
//   .catch((err) => {
//     console.log(
//       `Что-то пошло не так... Ошибка при редактировании профиля: ${err}`
//     );
//     })
// }