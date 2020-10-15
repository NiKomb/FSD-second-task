import Calendar from "@/components/calendar/calendar";

class DropdownDate {
  static initRangeDate({ selector = ".js-dropdown-date_date-range", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((element) => {
      new Calendar(element, {
        className: "js-dropdown-date__field-calendar",
        onSelect(formattedDate) {
          this.element = element;
          this.element.querySelector(
            ".js-dropdown-date__field_arrival",
          ).value = formattedDate.split("-")[0];

          this.element.querySelector(
            ".js-dropdown-date__field_departure",
          ).value = formattedDate.split("-")[1];
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
          this.element = element;
          this.element.querySelector(".js-dropdown-date__field").value = formattedDate;
        },
      });
    });
  }
}

DropdownDate.initFilterDate();
DropdownDate.initRangeDate();
