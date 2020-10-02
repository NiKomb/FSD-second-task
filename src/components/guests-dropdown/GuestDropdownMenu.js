import DropdownMenu from "@/components/dropdown-menu/DropdownMenu";

class GuestsDropdownMenu extends DropdownMenu {
  constructor() {
    super();
  }

  static initAll({ selector = ".js-guests-dropdown", parent = document }) {
    parent.querySelectorAll(selector).forEach((element) => {
      new GuestsDropdownMenu().create(element.firstChild);
    });
  }
}

export default GuestsDropdownMenu;
