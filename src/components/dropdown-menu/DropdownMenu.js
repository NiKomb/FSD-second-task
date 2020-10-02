class DropdownMenu {
  constructor() {}

  create(menu) {
    this._menu = menu;
    this._header = menu.querySelector(".js-dropdown-menu__header");
    this._header.addEventListener("click", this._handleHeaderClick.bind(this));
    this._content = this._header.nextElementSibling;
    this._inputs = this._content.querySelector(".js-dropdown-menu__count");

    console.log(this._content, this._inputs);
  }

  _handleHeaderClick() {
    this._toggleMenu();
  }

  _toggleMenu() {
    this._menu.classList.toggle("dropdown-menu_opened");
  }
}

export default DropdownMenu;
