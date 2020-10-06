import RussianLangUtil from "@/utils/RussianLangUtil";

class DropdownMenu {
  constructor(rewrittenValues = DropdownMenu.writeValues) {
    this.rewriteValues = rewrittenValues;
  }

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
    this.cancel.addEventListener("click", this._handleCancelButtonClick.bind(this));
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
      this._hideCancelButton(!this._isSummaryZero());
    }
  }

  _handleIncrementClick(event) {
    const input = event.target.previousElementSibling;
    const count = Number(input.value);

    input.value = count + 1;
    if (count === 0) {
      input.previousElementSibling.disabled = false;
    }
    this._hideCancelButton(true);
  }

  _handleConfirmButtonClick() {
    this._toggleMenu();
    this.valuesData = this._getInputValues();
    this._rewriteHeader(this.valuesData);
  }

  _handleCancelButtonClick() {
    this._cleanInputValues();
    this.valuesData = this._getInputValues();
    this._rewriteHeader(this.valuesData);
    this._hideCancelButton(false);
  }

  _toggleMenu() {
    this.menu.classList.toggle("dropdown-menu_opened");
  }

  _hideCancelButton(isVisible) {
    if (isVisible) {
      this.cancel.hidden = false;
    } else {
      this.cancel.hidden = true;
    }
  }

  _getInputValues() {
    const inputsValues = Array.from(this.inputs);
    return inputsValues.map((input) => Number(input.value));
  }

  _cleanInputValues() {
    this.inputs.forEach((input) => {
      input.value = 0;
      input.previousElementSibling.disabled = true;
    });
  }

  _rewriteHeader(values) {
    this.header.firstElementChild.textContent = this.rewriteValues(values);
  }

  _isSummaryZero() {
    const inputsValues = Array.from(this.inputs);
    return inputsValues.reduce((result, current) => Number(current.value) + result, 0) === 0;
  }

  static writeValues(countArray) {
    return countArray.map((count) => {
      RussianLangUtil.selectWordByCount(count, ["вещей", "вещь", "вещи", "вещей"], {
        withNumber: true,
      });
    });
  }
}

export default DropdownMenu;
