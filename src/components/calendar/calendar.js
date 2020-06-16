import "air-datepicker/dist/js/datepicker";
import "air-datepicker/dist/css/datepicker.min.css";

import "./calendar.scss";

class Calendar {
  constructor(calendarField, options) {
    this.calendarField = calendarField;

    this.initDatePicker(options);
    this.changeButtonsNames();

    this.addEventListeners();

    this.calendar = $(calendarField).data("datepicker").$datepicker;

    this.calendar.hide();
  }

  initDatePicker(options) {
    const defaultOptions = {
      classes: options.className,
      inline: false,
      range: true,
      minDate: new Date(),
      clearButton: true,
      todayButton: true,
    };

    $(this.calendarField).datepicker({ ...defaultOptions, ...options });
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
    $(this.calendarField).on("click", this.showCalendar.bind(this));
    $('span[data-action="today"]').on("click", this.hideCalendar.bind(this));
    $(document.body).on("mouseup", this.hideCalendar.bind(this));
  }

  showCalendar(event) {
    this.calendar.show();
  }

  hideCalendar(event) {
    event.stopPropagation();
    this.calendar.hide();
  }
}

export default Calendar;
