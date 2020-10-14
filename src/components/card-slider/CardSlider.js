class CardSlider {
  create(element) {
    this.slider = element;
    this.prev = this.slider.querySelector(".js-card-slider__control_prev");
    this.next = this.slider.querySelector(".js-card-slider__control_next");
    this.track = this.slider.querySelector(".js-card-slider__track");
    this.slides = this.slider.querySelectorAll(".js-card-slider__slide");
    this.dots = this.slider.querySelectorAll(".js-card-slider__dot");

    this.prev.addEventListener("click", this._handlePrevButtonClick.bind(this));
    this.next.addEventListener("click", this._handleNextButtonClick.bind(this));
  }

  _handleNextButtonClick() {
    this._moveSlideRight();
  }

  _handlePrevButtonClick() {
    this._moveSlideLeft();
  }

  _makeDotActive(index) {
    this.dots.forEach((dot) => {
      dot.classList.remove(".card-slider__dot_active");
    });
    this.dots[index + 1].classList.add(".card-slider__dot_active");
  }

  _moveSlideRight() {
    this.slides.forEach((slide, index) => {
      slide.style.transform = "translateX(-100%)";
      // this._makeDotActive(index);
    });
  }

  _moveSlideLeft() {
    this.slides.forEach((slide, index) => {
      slide.style.transform = "translateX(100%)";
      // this._makeDotActive(index);
    });
  }

  static initAll({ selector = ".js-card-slider", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((item) => {
      new CardSlider().create(item);
    });
  }
}

CardSlider.initAll();
