import RussianLangUtil from "@/utils/RussianLangUtil";

import DropdownMenu from "@/components/dropdown-menu/DropdownMenu";

class GuestsDropdownMenu extends DropdownMenu {
  constructor() {
    super(GuestsDropdownMenu.writeGuestsValues);
  }

  static writeGuestsValues(countArray) {
    let guestsInfo = RussianLangUtil.selectWordByCount(
      countArray[0] + countArray[1],
      ["Сколько гостей", "гость", "гостя", "гостей"],
      { withNumber: true },
    );

    if (countArray[2] > 0) {
      guestsInfo += `, ${RussianLangUtil.selectWordByCount(
        countArray[2],
        ["", "младенец", "младенца", "младенцев"],
        { withNumber: true },
      )}`;
    }

    return guestsInfo;
  }

  static initAll({ selector = ".js-guests-dropdown", parent = document }) {
    parent.querySelectorAll(selector).forEach((element) => {
      new GuestsDropdownMenu().create(element.firstChild);
    });
  }
}

export default GuestsDropdownMenu;
