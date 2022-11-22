export class Section {
    constructor({ items, renderer }, containerSelector) {
       this._cardFromServer = items;
       this._renderer = renderer;
       this._container = document.querySelector(containerSelector);
    }
    generate() {
        this._cardFromServer.forEach(card => this._renderer(card));
        }
    

    addItem(card) {
           this._container.prepend(card);
    }
}
