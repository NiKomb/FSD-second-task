import "ion-rangeslider";
import "ion-rangeslider/css/ion.rangeSlider.css";
import "./range-slider";

$(document).ready(function () {
  const $slider = $(".slider__item_with-range-slider");

  $slider.ionRangeSlider({
    type: "double",
    // min: 0,
    // max: 15000,
    // from: 5000,
    // to: 10000,
    hide_min_max: true,
    // hide_from_to: true,
    values_separator: " - ",
    postfix: "₽",
  });
});
