const legendList = document.querySelectorAll("li.js-pie-chart__item");
const circlesList = document.querySelectorAll(".js-pie-chart__circle");
const votesList = document.querySelectorAll(".js-pie-chart__votes");
const total = document.querySelector(".js-pie-chart__total");

legendList.forEach(function (item, index) {
  item.addEventListener("mouseover", function () {
    circlesList[index].classList.add("pie-chart__circle_hovered");
    total.classList.add("pie-chart__total_invisible");
  });

  item.addEventListener("mouseout", function () {
    circlesList[index].classList.remove("pie-chart__circle_hovered");
    total.classList.remove("pie-chart__total_invisible");
  });
});

circlesList.forEach(function (item, index) {
  item.addEventListener("mouseover", function () {
    votesList[index].classList.add("pie-chart__votes_visible");
    total.classList.add("pie-chart__total_invisible");
  });

  item.addEventListener("mouseout", function () {
    votesList[index].classList.remove("pie-chart__votes_visible");
    total.classList.remove("pie-chart__total_invisible");
  });
});
