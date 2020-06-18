import Calendar from "../../components/calendar/calendar";

const arrivalCalendar = new Calendar(".input_view-range_calendar", {
  className: "js-input_view-range__arrival-calendar",
  multipleDatesSeparator: "-",
  onSelect(formattedDate) {
    $(".input_view-range_arrival .input__field").val(
      formattedDate.split("-")[0]
    );
    $(".input_view-range_check-out .input__field").val(
      formattedDate.split("-")[1]
    );
  },
});

const filterCalendar = new Calendar(
  ".input_with-filter-date-calendar .field-input",
  {
    className: ".js-input_with-filter-date-calendar",
    dateFormat: "dd M",
    multipleDatesSeparator: " - ",
  }
);
