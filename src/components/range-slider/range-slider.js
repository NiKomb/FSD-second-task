import "ion-rangeslider";
import "ion-rangeslider/css/ion.rangeSlider.css";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const slider = $(".js-slider__item_with-range-slider");
    const sliderTitle = document.querySelector(".slider__title > h3");

    slider.ionRangeSlider({
      type: "double",
      min: 0,
      max: 15000,
      from: 5000,
      to: 10000,
      hide_min_max: true,
      hide_from_to: true,
      values_separator: " - ",
      postfix: "₽",
      onStart(data) {
        sliderTitle.dataset.subtitle = `${data.from}₽ - ${data.to}₽`;
      },
      onChange(data) {
        sliderTitle.dataset.subtitle = `${data.from}₽ - ${data.to}₽`;
      },
    });
  },
  { once: true }
);
