import "air-datepicker/dist/js/datepicker"
import "air-datepicker/dist/css/datepicker.min.css"

import "./calendar.scss"

class Calendar {
  constructor(combine, options) {
    this.combine = combine;

    this.initDatePicker(options);
    this.createButtons();

    this.calendar = $(combine).data('datepicker').$datepicker;

    this.calendar.hide();
  }

  initDatePicker(options) {
    const defaultOptions = {
      classes: options.className,
      range: true,
      minDate: new Date(),
      clearButton: true,
      todayButton: true,
    };

    $(this.combine).datepicker({ ...defaultOptions, ...options });
  }


}

export default Calendar;
