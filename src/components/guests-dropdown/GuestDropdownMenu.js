import RussianLangUtil from "@/utils/RussianLangUtil";

import DropdownMenu from "@/components/dropdown-menu/DropdownMenu";

class GuestsDropdownMenu extends DropdownMenu {
  constructor() {
    super(GuestsDropdownMenu.writeGuestsValues);
  }

  static writeGuestsValues(countArray) {
    let guestsInfo = `Сколько гостей`;

    if (countArray[0] > 0 || countArray[1] > 0) {
      guestsInfo = RussianLangUtil.selectWordByCount(
        countArray[0] + countArray[1],
        ["Сколько гостей", "гость", "гостя", "гостей"],
        { withNumber: true },
      );
    }

    if (countArray[0] == 0 && countArray[2] !== 0) {
      guestsInfo = `Укажите взрослых`;
    }

    if (countArray[2] > 0 && countArray[0]) {
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
