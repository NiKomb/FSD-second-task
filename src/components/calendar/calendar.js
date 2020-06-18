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
    const switchCalendar = this.clickOn.bind(this);

    document.addEventListener("click", switchCalendar);
  }

  clickOn(event) {
    const clickOnField = event.target.dataset.field;
    const clickOnButton = event.target.dataset.action;
    const clickOnDocument = event.target.className.match(/(datepicker)/g);
    console.log(clickOnDocument);

    console.log(event.target);

    if (clickOnField === "calendar") {
      this.calendar.show();
    } else if (clickOnButton === "today") {
      this.calendar.hide();
      document.removeEventListener("click", this.switchCalendar);
    } else {
      if (!clickOnDocument) {
        this.calendar.hide();
        document.removeEventListener("click", this.switchCalendar);
      }
    }
  }
}

export default Calendar;
