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

    this.isWithAction = Boolean(this.confirm && this.cancel);
    this._initEventListeners();
    this._createState(this.isWithAction);
  }

  _initEventListeners() {
    document.addEventListener("click", this._handleDocumentClick.bind(this));
    this.header.addEventListener("click", this._handleHeaderClick.bind(this));

    this.decrements.forEach((decrement) => {
      decrement.addEventListener("click", this._handleDecrementClick.bind(this));
    });

    this.increments.forEach((increment) => {
      increment.addEventListener("click", this._handleIncrementClick.bind(this));
    });

    if (this.isWithAction) {
      this.confirm.addEventListener("click", this._handleConfirmButtonClick.bind(this));
      this.cancel.addEventListener("click", this._handleCancelButtonClick.bind(this));
    }
  }

  _createState(withActions) {
    if (withActions) {
      this.valuesData = [];
      this.isStateChanged = false;
    }
    this._prepareInputs();
    this._rewriteHeader(this._getInputValues());
    this._hideCancelButton(this._isSummaryZero());
  }

  _prepareInputs() {
    this.inputs.forEach((input, index) => {
      if (this.valuesData !== undefined) {
        this.valuesData[index] = Number(input.value);
      }
      if (Number(input.value) === 0) {
        input.previousElementSibling.disabled = true;
      }
    });
  }

  _isRecoverRequired() {
    return this.valuesData !== undefined && this.isStateChanged;
  }

  _recoverState() {
    if (this._isRecoverRequired()) {
      this.inputs.forEach((input, index) => {
        input.value = this.valuesData[index];
        this.decrements[index].disabled = Number(this.valuesData[index]) === 0;
      });
      this._hideCancelButton(this._isSummaryZero());
      this.isStateChanged = true;
    }
  }

  _handleDocumentClick(event) {
    if (!this.menu.contains(event.target)) {
      this.menu.classList.remove("dropdown-menu_opened");
      this._recoverState();
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
      this._hideCancelButton(this._isSummaryZero());
    }

    this._rewriteHeaderIfRequired();
    this.isStateChanged = true;
  }

  _handleIncrementClick(event) {
    const input = event.target.previousElementSibling;
    const count = Number(input.value);

    input.value = count + 1;
    if (count === 0) {
      input.previousElementSibling.disabled = false;
    }
    this._hideCancelButton(!this._isSummaryZero);

    this._rewriteHeaderIfRequired();
    this.isStateChanged = true;
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
    this._hideCancelButton(true);
  }

  _toggleMenu() {
    this.menu.classList.toggle("dropdown-menu_opened");
  }

  _hideCancelButton(isHidden) {
    if (isHidden && this.isWithAction) {
      this.cancel.hidden = true;
    } else if (this.isWithAction) {
      this.cancel.hidden = false;
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

  _rewriteHeaderIfRequired() {
    if (this.valuesData === undefined) {
      this._rewriteHeader(this._getInputValues());
    }
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
