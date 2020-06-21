import "air-datepicker/dist/js/datepicker";
import "air-datepicker/dist/css/datepicker.min.css";

import "./calendar.scss";

class Calendar {
  constructor(calendarField, additionalOptions) {
    this.calendarField = calendarField;

    this.initDatePicker(additionalOptions);
    this.changeButtonsNames();

    this.addEventListeners();

    this.calendar = $(calendarField).data("datepicker").$datepicker;

    this.calendar.hide();
  }

  initDatePicker(additionalOptions) {
    const defaultOptions = {
      classes: additionalOptions.className,
      inline: true,
      range: true,
      minDate: new Date(),
      clearButton: true,
      todayButton: true,
      prevHtml:
        '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z"></path></svg>',
      nextHtml:
        '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z"></path></svg>',
    };

    $(this.calendarField).datepicker({
      ...defaultOptions,
      ...additionalOptions,
    });
  }

  changeButtonsNames() {
    const datePickerButtons = $(this.calendarField)
      .data("datepicker")
      .$datepicker[0].querySelector(".datepicker--buttons");

    datePickerButtons.innerHTML = "";
    const clearButtonWrapper = `<span class="datepicker--button" data-action="clear">Очистить</span>`;
    const applyButtonWrapper = `<span class="datepicker--button" data-action="today">Применить</span>`;

    datePickerButtons.insertAdjacentHTML(
      "beforeend",
      [clearButtonWrapper, applyButtonWrapper].join("")
    );
  }

  addEventListeners() {
    const clickOnCalendar = this.showCalendar.bind(this);
    const clickOnDocument = this.hideCalendar.bind(this);

    $(this.calendarField).on("click", clickOnCalendar);
    $(document).on("click", clickOnDocument);
  }

  hideCalendar(event) {
    const clickOnDocument = event.target.className.match(/(datepicker|input)/g);

    if (!clickOnDocument) {
      this.calendar.hide();
    }
  }

  showCalendar(event) {
    const clickOnField = event.target.dataset.field;
    const clickOnButton = event.target.dataset.action;

    console.log(event.target.className);

    if (clickOnField === "calendar") {
      if (this.calendar[0].style.display === "") {
        this.calendar.hide();
      } else {
        this.calendar.show();
      }
    } else if (clickOnButton === "today") {
      this.calendar.hide();
    }
  }
}

export default Calendar;
