import Calendar from "../../components/calendar/calendar";

const arrivalCalendar = new Calendar(".input_with-range-calendar", {
  className: "js-input_with-range-calendar",
  multipleDatesSeparator: "-",
  onSelect(formattedDate) {
    $(".input_with-range-calendar_arrival .input__field").val(
      formattedDate.split("-")[0]
    );
    $(".input_with-range-calendar_check-out .input__field").val(
      formattedDate.split("-")[1]
    );
  },
});

const filterCalendar = new Calendar(
  ".input_with-filter-date-calendar .input__field",
  {
    className: ".js-input_with-filter-date-calendar",
    dateFormat: "dd M",
    multipleDatesSeparator: " - ",
  }
);
