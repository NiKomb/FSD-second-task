class DropdownMenu {
  constructor() {}

  create(anchor) {
    this.menu = anchor;
    this.header = this.menu.querySelector(".js-dropdown-menu__header");
    this.content = this.header.nextElementSibling;
    this.increments = this.content.querySelectorAll(".js-dropdown-menu__increment");
    this.decrements = this.content.querySelectorAll(".js-dropdown-menu__decrement");
    this.inputs = this.content.querySelectorAll(".js-dropdown-menu__count");
    this.confirm = this.content.querySelector(".js-dropdown-menu__button_type_confirm");
    this.cancel = this.content.querySelector(".js-dropdown-menu__button_type_cancel");

    document.addEventListener("click", this._handleDocumentClick.bind(this));
    this.header.addEventListener("click", this._handleHeaderClick.bind(this));
    this.decrements.forEach((decrement) => {
      decrement.addEventListener("click", this._handleDecrementClick.bind(this));
    });
    this.increments.forEach((increment) => {
      increment.addEventListener("click", this._handleIncrementClick.bind(this));
    });
    this.confirm.addEventListener("click", this._handleConfirmButtonClick.bind(this));
  }

  _handleDocumentClick(event) {
    if (!this.menu.contains(event.target)) {
      this.menu.classList.remove("dropdown-menu_opened");
    }
  }
  _handleHeaderClick() {
    this._toggleMenu();
  }

  _handleDecrementClick(event) {
    const input = event.target.nextElementSibling;
    const count = Number(input.value);
    input.value = count - 1;
    if (Number(input.value) === 0) {
      input.previousElementSibling.disabled = true;
      this._hideCancel(!this._isSummaryZero());
    }
  }

  _handleIncrementClick(event) {
    const input = event.target.previousElementSibling;
    const count = Number(input.value);
    input.value = count + 1;
    if (count === 0) {
      input.previousElementSibling.disabled = false;
    }
    this._hideCancel(true);
  }

  _handleConfirmButtonClick() {
    this._toggleMenu();
  }

  _toggleMenu() {
    this.menu.classList.toggle("dropdown-menu_opened");
  }

  _hideCancel(isVisible) {
    if (isVisible) {
      this.cancel.classList.remove("dropdown-menu__button_hidden");
    } else {
      this.cancel.classList.add("dropdown-menu__button_hidden");
    }
  }

  _isSummaryZero() {
    const inputsValues = Array.from(this.inputs);
    return inputsValues.reduce((result, current) => Number(current.value) + result, 0) === 0;
  }
}

export default DropdownMenu;
