import Calendar from "@/components/calendar/calendar";

class DropdownDate {
  static initRangeDate({ selector = ".js-dropdown-date_date-range", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((element) => {
      new Calendar(element, {
        className: "js-dropdown-date__field-calendar",
        onSelect(formattedDate) {
          $(".js-dropdown-date__field_arrival").val(formattedDate.split("-")[0]);
          $(".js-dropdown-date__field_departure").val(formattedDate.split("-")[1]);
        },
      });
    });
  }

  static initFilterDate({ selector = ".js-dropdown-date_date-filter", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((element) => {
      new Calendar(element, {
        className: "js-dropdown-date__field-calendar",
        dateFormat: "dd M",
        onSelect(formattedDate) {
          $(".js-dropdown-date_date-filter .js-dropdown-date__field").val(formattedDate);
        },
      });
    });
  }
}

DropdownDate.initFilterDate();
DropdownDate.initRangeDate();
