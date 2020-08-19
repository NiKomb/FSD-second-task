const legendList = document.querySelectorAll(".js-pie-chart__item");
const circlesList = document.querySelectorAll(".js-pie-chart__circle");

console.log(legendList);
console.log(circlesList);

legendList.forEach(function (item, index) {
  item.addEventListener("mouseover", function () {
    circlesList[index].classList.add("pie-chart__circle_hovered");
  });

  item.addEventListener("mouseout", function () {
    circlesList[index].classList.remove("pie-chart__circle_hovered");
  });
});
