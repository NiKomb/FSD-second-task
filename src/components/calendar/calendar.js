import "air-datepicker/dist/js/datepicker";
import "air-datepicker/dist/css/datepicker.min.css";

class Calendar {
  constructor(anchor, additionalOptions) {
    const defaultOptions = {
      minDate: new Date(),
      classes: additionalOptions.className,
      range: true,
      multipleDatesSeparator: " - ",

      clearButton: true,
      todayButton: true,
      navTitles: {
        days: "MM yyyy",
      },
      prevHtml: '<div class="datepicker--arrow datepicker--arrow-reverted"></div>',
      nextHtml: '<div class="datepicker--arrow"></div>',
    };

    this.$anchor = anchor;
    this.fields = this.$anchor.querySelectorAll(".js-dropdown-date__field");

    this.calendar = $(this.$anchor)
      .datepicker({
        ...defaultOptions,
        ...additionalOptions,
      })
      .data("datepicker").$datepicker;

    this._changeButtonsNames();
    this._addEventListeners();
    this.calendar.hide();
  }

  _changeButtonsNames() {
    const datePickerButtons = $(this.$anchor)
      .data("datepicker")
      .$datepicker[0].querySelector(".datepicker--buttons");

    datePickerButtons.innerHTML = "";
    const clearButtonWrapper = `<span class="datepicker--button" data-action="clear">Очистить</span>`;
    const applyButtonWrapper = `<span class="datepicker--button" data-action="today">Применить</span>`;

    datePickerButtons.insertAdjacentHTML(
      "beforeend",
      [clearButtonWrapper, applyButtonWrapper].join(""),
    );
  }

  _addEventListeners() {
    this.fields.forEach((field) => {
      field.addEventListener("click", this._handleFieldClick.bind(this));
    });

    document.addEventListener("click", this._handleDocumentClick.bind(this));
  }

  _handleFieldClick() {
    this.calendar.show();
  }

  _handleDocumentClick(event) {
    if (!this.$anchor.contains(event.target)) {
      this.calendar.hide();
    }
  }
}

export default Calendar;
