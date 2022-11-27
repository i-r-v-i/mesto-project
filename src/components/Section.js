export class Section {
    constructor({ items, renderer }, containerSelector) {
       this._itemsFromServer = items;
       this._renderer = renderer;
       this._container = document.querySelector(containerSelector);
    }
    renderItems() {
        this._itemsFromServer.forEach(item => this._renderer(item));
        }

    addItem(item) {
        this._container.prepend(item);
    }
}
