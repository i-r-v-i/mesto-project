(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{MG:()=>N,B5:()=>B});var t={formSelector:".form",inputSelector:".form__item",buttonSelector:".button",inactiveButtonClass:"button_disabled",inputErrorClass:"input-error",errorClass:"form__item_type_error"},n=document.querySelector(".popup_type_profile"),r=document.querySelector(".profile__name"),o=document.querySelector(".profile__activity"),c=document.querySelector(".edit-button"),a=document.forms.editProfile,u=a.querySelector(".form__item_edit_name"),i=a.querySelector(".form__item_edit_activity"),l=document.querySelector(".profile__avatar"),d=document.querySelector(".form__item_avatar-link"),s=(document.querySelector(".button-avatar-submit"),document.querySelector(".button-avatar")),f=document.forms.editAvatar,m=document.querySelector(".popup_type_avatar"),v=document.querySelector(".cards__list"),y=document.querySelector(".popup_type_newcard"),p=document.querySelector(".add-button"),_=document.querySelector(".form__item_card_name"),h=document.querySelector(".form__item_card_link"),S=document.forms.cardForm,b=document.querySelector(".popup_type_zoom"),q=document.querySelector(".popup__title"),g=document.querySelector(".popup__img");function C(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.errorClass),r.textContent=t.validationMessage}(e,t,n):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.errorClass),r.textContent=t.validationMessage}(e,t,n)}function E(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function L(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.buttonSelector);E(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){C(e,o,t),E(n,r,t)}))}))}function k(e){e.classList.add("popup_opened"),document.addEventListener("keydown",x),e.addEventListener("mousedown",w)}function A(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",x),e.removeEventListener("mousedown",w)}function x(e){"Escape"===e.key&&A(document.querySelector(".popup_opened"))}function w(e){e.target.classList.contains("popup_opened")&&A(document.querySelector(".popup_opened"))}function O(e,t,n){e.querySelector(".button").textContent=t?"Сохранение...":n}function P(e,t,n){!function(e,t){e.querySelector(".card__like-count").textContent=t.length}(e,t),function(e,t,n){var r=e.querySelector(".card__like");!function(e,t){return Boolean(e.find((function(e){return e._id===t})))}(t,n)?r.classList.remove("card__like_active"):r.classList.add("card__like_active")}(e,t,n)}var j={url:"https://nomoreparties.co/v1/plus-cohort-16",headers:{authorization:"34adb4d1-3b9f-4221-8c5f-16ba80991dd4","Content-Type":"application/json"}};function T(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}function D(){return fetch("".concat(j.url,"/users/me"),{headers:j.headers}).then(T)}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function B(e,t,n,r){(function(e,t){return fetch("".concat(j.url,"/cards/likes/").concat(t),{method:e?"DELETE":"PUT",headers:j.headers}).then(T)})(t,n).then((function(t){P(e,t.likes,r)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при добавлении лайка: ".concat(e))}))}function N(e,t){(function(e){return fetch("".concat(j.url,"/cards/").concat(e),{method:"DELETE",headers:j.headers}).then(T)})(t).then((function(){e.remove(),e=null}))}function I(e,t,n){var r=function(e,t){var n=document.querySelector("#card").content.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__img"),o=n.querySelector(".card__title"),c=n.querySelector(".card__bin"),a=n.querySelector(".card__like");return r.src=e.link,r.alt=e.name,o.textContent=e.name,e.owner._id!==t&&c.remove(),P(n,e.likes,t),r.addEventListener("click",(function(){return function(e,t){q.textContent=e.name,g.src=e.link,g.alt=e.name,k(t)}(e,b)})),a.addEventListener("click",(function(){a.classList.contains("card__like_active")?B(n,!0,e._id,t):B(n,!1,e._id,t)})),c.addEventListener("click",(function(){return N(n,e._id)})),n}(t,n);e.prepend(r)}Array.from(document.querySelectorAll(".close-icon")).forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){A(t)}))})),c.addEventListener("click",(function(){u.value=r.textContent,i.value=o.textContent,k(n),C(a,u,t),C(a,i,t)})),a.addEventListener("submit",(function(e){var t;e.preventDefault(),O(e.target,!0,"Cохранить"),(t={name:u.value,about:i.value},fetch("".concat(j.url,"/users/me"),{method:"PATCH",headers:j.headers,body:JSON.stringify({name:t.name,about:t.about})}).then(T)).then((function(){z(),A(n)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при редактировании профиля: ".concat(e))})).finally((function(){O(e.target,!1,"Cохранить")}))})),p.addEventListener("click",(function(){return k(y)})),S.addEventListener("submit",(function(e){var n;e.preventDefault(),O(e.target,!0,"Cоздать"),(n={link:h.value,name:_.value},fetch("".concat(j.url,"/cards"),{method:"POST",headers:j.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(T)).then((function(n){I(v,n,J),A(y),e.target.reset(),L(e.target,t)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при добвлении новой карточки: ".concat(e))})).finally((function(){O(e.target,!1,"Cоздать")}))})),s.addEventListener("click",(function(){return k(m)})),f.addEventListener("submit",(function(e){var n;e.preventDefault(),O(e.target,!0,"Cохранить"),(n={avatar:d.value},fetch("".concat(j.url,"/users/me/avatar"),{method:"PATCH",headers:j.headers,body:JSON.stringify(n)}).then(T)).then((function(){z(),A(m),e.target.reset(),L(e.target,t)})).catch((function(e){console.log("Что-то пошло не так... Ошибка при редактировании профиля: ".concat(e))})).finally((function(){O(e.target,!1,"Cохранить")}))}));var J=null;function z(){D().then((function(e){r.textContent=e.name,o.textContent=e.about,l.src=e.avatar,J=e._id})).catch((function(e){console.log("Что-то пошло не так... Ошибка при редактировании профиля: ".concat(e))}))}Promise.all([fetch("".concat(j.url,"/cards"),{headers:j.headers}).then(T),D()]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];r.textContent=u.name,o.textContent=u.about,l.src=u.avatar,J=u._id,a.reverse().forEach((function(e){I(v,e,J)}))})).catch((function(e){console.log("Что-то пошло не так... Ошибка при получении данных с сервера: ".concat(e))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(n){n.preventDefault(),L(t,e)})),L(t,e)}))}(t)})();