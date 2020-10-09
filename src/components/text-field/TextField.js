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
// const arrivalCalendar = new Calendar(".input_with-range-calendar", {
//   className: "js-input_with-range-calendar",
//   multipleDatesSeparator: "-",
//   onSelect(formattedDate) {
//     $(".input_with-range-calendar_arrival .input__field").val(
//       formattedDate.split("-")[0]
//     );
//     $(".input_with-range-calendar_check-out .input__field").val(
//       formattedDate.split("-")[1]
//     );
//   },
// });

// const filterCalendar = new Calendar(
//   ".input_with-filter-date-calendar .input__field",
//   {
//     className: ".js-input_with-filter-date-calendar",
//     dateFormat: "dd M",
//     multipleDatesSeparator: " - ",
//   }
// );
