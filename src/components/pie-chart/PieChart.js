class PieChart {
  create(element) {
    this.chart = element;

    this.items = this.chart.querySelectorAll("li.js-pie-chart__item");
    this.circles = this.chart.querySelectorAll(".js-pie-chart__circle");
    this.votes = this.chart.querySelectorAll(".js-pie-chart__votes");
    this.total = this.chart.querySelector(".js-pie-chart__total");

    this.items.forEach((item, i) => {
      item.addEventListener("mouseover", this._handleItemMouseOver.bind(this, i));
      item.addEventListener("mouseout", this._handleItemMouseOut.bind(this, i));
    });

    this.circles.forEach((circle, i) => {
      circle.addEventListener("mouseover", this._handleCircleMouseOver.bind(this, i));
      circle.addEventListener("mouseout", this._handleCircleMouseOut.bind(this, i));
    });
  }

  _handleItemMouseOver(i) {
    this.circles[i].classList.add("pie-chart__circle_hovered");
    this.total.classList.add("pie-chart__total_invisible");
  }

  _handleItemMouseOut(i) {
    this.circles[i].classList.remove("pie-chart__circle_hovered");
    this.total.classList.remove("pie-chart__total_invisible");
  }

  _handleCircleMouseOver(i) {
    this.votes[i].classList.add("pie-chart__votes_visible");
    this.total.classList.add("pie-chart__total_invisible");
  }

  _handleCircleMouseOut(i) {
    this.votes[i].classList.remove("pie-chart__votes_visible");
    this.total.classList.remove("pie-chart__total_invisible");
  }

  static initAll({ selector = ".js-pie-chart", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((item) => {
      new PieChart().create(item);
    });
  }
}

PieChart.initAll();
