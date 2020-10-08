class CheckboxList {
  create(element) {
    this.list = element;
    this.title = this.list.querySelector(".js-checkbox-list__title");
    this.mark = this.list.querySelector(".js-checkbox-list__mark");
    this.items = this.list.querySelector(".js-checkbox-list__items");

    if (this.title) {
      this.title.addEventListener("click", this._handleTitleClick.bind(this));
    }
  }

  _handleTitleClick() {
    this.mark.classList.toggle("checkbox-list__mark_active");
    this.items.classList.toggle("checkbox-list__items_hidden");
  }

  static initAll({ selector = ".js-checkbox-list", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((item) => {
      new CheckboxList().create(item);
    });
  }
}

CheckboxList.initAll();
