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
      prevHtml:
        '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z"></path></svg>',
      nextHtml:
        '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z"></path></svg>',
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
