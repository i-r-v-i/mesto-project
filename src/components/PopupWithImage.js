import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
    constructor(popupSelector, popupZoomTitle, popupZoomImg) {
        super(popupSelector);
        this._popupZoomTitle = popupZoomTitle;
        this._popupZoomImg = popupZoomImg;
    }

    openPopup(data) {
        this._popupZoomTitle.textContent = data.name;
        this._popupZoomImg.src =  data.link;
        this._popupZoomImg.alt = data.name;
        super.openPopup();
    }  
}