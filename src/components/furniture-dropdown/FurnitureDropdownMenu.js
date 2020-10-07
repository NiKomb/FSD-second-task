import RussianLangUtil from "@/utils/RussianLangUtil";
import DropdownMenu from "@/components/dropdown-menu/DropdownMenu";

class FurnitureDropdownMenu extends DropdownMenu {
  constructor() {
    super(FurnitureDropdownMenu.writeFurnitureValues);
  }

  static writeFurnitureValues(countArray) {
    const headerRow = [];
    const wordForms = [
      ["спален", "спальня", "спальни", "спален"],
      ["кроватей", "кровать", "кровати", "кроватей"],
      ["ванных комнат", "ванная комната", "ванные комнаты", "ванных комнат"],
    ];

    for (let i = 0; i < wordForms.length; i += 1) {
      if (countArray[i] > 0) {
        headerRow.push(
          RussianLangUtil.selectWordByCount(countArray[i], wordForms[i], { withNumber: true }),
        );
      }
    }

    return headerRow.length > 0 ? headerRow.join(`, `) : `Удобства не выбраны`;
  }

  static initAll({ selector = ".js-furniture-dropdown", parent = document }) {
    parent.querySelectorAll(selector).forEach((element) => {
      new FurnitureDropdownMenu().create(element.firstChild);
    });
  }
}

export default FurnitureDropdownMenu;
