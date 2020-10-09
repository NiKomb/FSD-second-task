import MaskedDateUtil from "@/utils/MaskedDateUtil";

class TextField {
  create(anchor) {
    this.anchor = anchor;
    this.input = this.anchor.querySelector(".js-text-field__input");

    if (this.input) {
      this.input.addEventListener("input", this._handleInput.bind(this));
    }
  }

  _handleInput({ target }) {
    target.value = MaskedDateUtil.setMask(target.value);
  }

  static initMask({ selector = ".js-text-field_masked", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((element) => {
      new TextField().create(element);
    });
  }
}

TextField.initMask();
