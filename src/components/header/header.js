class Header {
  create(element) {
    this.header = element;
    this.navigation = this.header.querySelector(".js-header__navigation");
    this.toggle = this.header.querySelector(".js-header__toggle");

    this.toggle.addEventListener("click", this._handleToggleClick.bind(this));
  }

  _handleToggleClick() {
    this.navigation.classList.toggle("header__navigation_is-open");
    this.toggle.classList.toggle("header__toggle_active");
  }

  static initAll({ selector = ".js-header", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((item) => {
      new Header().create(item);
    });
  }
}

Header.initAll();
