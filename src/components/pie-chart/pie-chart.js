const itemList = document.querySelectorAll("li.js-pie-chart__item");
const circlesList = document.querySelectorAll(".js-pie-chart__circle");
const votesList = document.querySelectorAll(".js-pie-chart__votes");
const total = document.querySelector(".js-pie-chart__total");

itemList.forEach(function (item, i) {
  item.addEventListener("mouseover", handleItemMouseOver);
  item.addEventListener("mouseout", handleItemMouseOut);

  function handleItemMouseOver() {
    circlesList[i].classList.add("pie-chart__circle_hovered");

    total.classList.add("pie-chart__total_invisible");
  }

  function handleItemMouseOut() {
    circlesList[i].classList.remove("pie-chart__circle_hovered");
    total.classList.remove("pie-chart__total_invisible");
  }
});

circlesList.forEach(function (circle, i) {
  circle.addEventListener("mouseover", handleCircleMouseOver);
  circle.addEventListener("mouseout", handleCircleMouseOut);

  function handleCircleMouseOver() {
    votesList[i].classList.add("pie-chart__votes_visible");
    total.classList.add("pie-chart__total_invisible");
  }

  function handleCircleMouseOut() {
    votesList[i].classList.remove("pie-chart__votes_visible");
    total.classList.remove("pie-chart__total_invisible");
  }
});
