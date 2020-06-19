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
    const clickOn = this.switchCalendar.bind(this);

    document.addEventListener("click", clickOn);
  }

  switchCalendar(event) {
    const clickOnField = event.target.dataset.field;
    const clickOnButton = event.target.dataset.action;
    const clickOnDocument = event.target.className.match(/(datepicker)/g);

    if (clickOnField === "calendar") {
      if (this.calendar[0].style.display === "") {
        this.calendar.hide();
      } else {
        this.calendar.show();
      }
    } else if (clickOnButton === "today") {
      this.calendar.hide();
    } else if (!clickOnDocument) {
      this.calendar.hide();
    }
  }
}

export default Calendar;
