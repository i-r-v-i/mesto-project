(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{MG:()=>I,B5:()=>N});var t={formSelector:".form",inputSelector:".form__item",buttonSelector:".button",inactiveButtonClass:"button_disabled",inputErrorClass:"input-error",errorClass:"form__item_type_error"},n=document.querySelector(".popup_type_profile"),r=document.querySelector(".profile__name"),o=document.querySelector(".profile__activity"),c=document.querySelector(".edit-button"),a=document.forms.editProfile,u=a.querySelector(".form__item_edit_name"),i=a.querySelector(".form__item_edit_activity"),l=document.querySelector(".profile__avatar"),d=document.querySelector(".form__item_avatar-link"),s=document.querySelector(".button-avatar-submit"),f=document.querySelector(".button-avatar"),m=document.forms.editAvatar,v=document.querySelector(".popup_type_avatar"),y=document.querySelector(".cards__list"),p=document.querySelector(".popup_type_newcard"),_=document.querySelector(".add-button"),h=document.querySelector(".form__item_card_name"),S=document.querySelector(".form__item_card_link"),b=document.forms.cardForm,q=document.querySelector(".new-card-button"),g=document.querySelector(".popup_type_zoom"),C=document.querySelector(".popup__title"),E=document.querySelector(".popup__img");function L(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0}function k(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.classList.remove(t.inactiveButtonClass),e.disabled=!1}(t,n):L(t,n)}function A(e){e.classList.add("popup_opened"),document.addEventListener("keydown",w),e.addEventListener("mousedown",O)}function x(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",w),e.removeEventListener("mousedown",O)}function w(e){"Escape"===e.key&&x(document.querySelector(".popup_opened"))}function O(e){e.target.classList.contains("popup_opened")&&x(document.querySelector(".popup_opened"))}function P(e,t,n){e.querySelector(".button").textContent=t?"Сохранение...":n}function j(e,t,n){!function(e,t){e.querySelector(".card__like-count").textContent=t.length}(e,t),function(e,t,n){var r=e.querySelector(".card__like");!function(e,t){return Boolean(e.find((function(e){return e._id===t})))}(t,n)?r.classList.remove("card__like_active"):r.classList.add("card__like_active")}(e,t,n)}var T={url:"https://nomoreparties.co/v1/plus-cohort-16",headers:{authorization:"34adb4d1-3b9f-4221-8c5f-16ba80991dd4","Content-Type":"application/json"}};function D(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}function M(){return fetch("".concat(T.url,"/users/me"),{headers:T.headers}).then(D)}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function N(e,t,n,r){(function(e,t){return fetch("".concat(T.url,"/cards/likes/").concat(t),{method:e?"DELETE":"PUT",headers:T.headers}).then(D)})(t,n).then((function(t){j(e,t.likes,r)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при добавлении лайка: ".concat(e))}))}function I(e,t){(function(e){return fetch("".concat(T.url,"/cards/").concat(e),{method:"DELETE",headers:T.headers}).then(D)})(t).then((function(){!function(e){e.remove(),e=null}(e)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при удалении карточки: ".concat(e))}))}function J(e,t,n){var r=function(e,t){var n=document.querySelector("#card").content.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__img"),o=n.querySelector(".card__title"),c=n.querySelector(".card__bin"),a=n.querySelector(".card__like");return r.src=e.link,r.alt=e.name,o.textContent=e.name,e.owner._id!==t&&c.remove(),j(n,e.likes,t),r.addEventListener("click",(function(){return function(e,t){C.textContent=e.name,E.src=e.link,E.alt=e.name,A(t)}(e,g)})),a.addEventListener("click",(function(){a.classList.contains("card__like_active")?N(n,!0,e._id,t):N(n,!1,e._id,t)})),c.addEventListener("click",(function(){return I(n,e._id)})),n}(t,n);e.prepend(r)}Array.from(document.querySelectorAll(".close-icon")).forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){x(t)}))})),c.addEventListener("click",(function(){u.value=r.textContent,i.value=o.textContent,A(n)})),a.addEventListener("submit",(function(e){var t;e.preventDefault(),P(e.target,!0,"Cохранить"),(t={name:u.value,about:i.value},fetch("".concat(T.url,"/users/me"),{method:"PATCH",headers:T.headers,body:JSON.stringify({name:t.name,about:t.about})}).then(D)).then((function(){H(),x(n)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при редактировании профиля: ".concat(e))})).finally((function(){P(e.target,!1,"Cохранить")}))})),_.addEventListener("click",(function(){return A(p)})),b.addEventListener("submit",(function(e){var n;e.preventDefault(),P(e.target,!0,"Cоздать"),(n={link:S.value,name:h.value},fetch("".concat(T.url,"/cards"),{method:"POST",headers:T.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(D)).then((function(n){J(y,n,z),x(p),e.target.reset(),L(q,t)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при добвлении новой карточки: ".concat(e))})).finally((function(){P(e.target,!1,"Cоздать")}))})),f.addEventListener("click",(function(){return A(v)})),m.addEventListener("submit",(function(e){var n;e.preventDefault(),P(e.target,!0,"Cохранить"),(n={avatar:d.value},fetch("".concat(T.url,"/users/me/avatar"),{method:"PATCH",headers:T.headers,body:JSON.stringify(n)}).then(D)).then((function(){H(),x(v),e.target.reset(),L(s,t)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при редактировании профиля: ".concat(e))})).finally((function(){P(e.target,!1,"Cохранить")}))}));var z=null;function H(){M().then((function(e){r.textContent=e.name,o.textContent=e.about,l.src=e.avatar,z=e._id})).catch((function(e){console.log("Что-то пошло не так... Ошибка при редактировании профиля: ".concat(e))}))}Promise.all([fetch("".concat(T.url,"/cards"),{headers:T.headers}).then(D),M()]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];r.textContent=u.name,o.textContent=u.about,l.src=u.avatar,z=u._id,a.reverse().forEach((function(e){J(y,e,z)}))})).catch((function(e){console.log("Что-то пошло не так... Ошибка при получении данных с сервера: ".concat(e))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.buttonSelector);k(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.errorClass),r.textContent=t.validationMessage}(e,t,n):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.errorClass),r.textContent=t.validationMessage}(e,t,n)}(e,o,t),k(n,r,t)}))}))}(t,e)}))}(t)})();