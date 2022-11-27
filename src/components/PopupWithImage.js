import { Popup } from "./Popup.js"
import { popupZoomTitle, popupZoomImg } from "../utils/data.js"

export class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
            this._name = data.name;
            this._link = data.link;
    }

    openPopup() {
        super.openPopup();
        popupZoomTitle.textContent = this._name;
        popupZoomImg.src =  this._link;
        popupZoomImg.alt = this._name;
    }  
}