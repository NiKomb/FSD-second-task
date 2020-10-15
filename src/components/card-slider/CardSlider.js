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

    this._makeCount();
    this._moveSlides();
  }

  _handleNextButtonClick() {
    this._moveSlideRight();
  }

  _handlePrevButtonClick() {
    this._moveSlideLeft();
  }

  _moveSlideRight() {
    this.count += 1;

    this._moveSlides();
    this._toggleDots(this.count);
  }

  _moveSlideLeft() {
    this.count -= 1;

    this._moveSlides();
    this._toggleDots(this.count);
  }

  _makeCount() {
    this.dots.forEach((dot) => {
      if (dot.classList.contains("card-slider__dot_active")) {
        this.count = Number(dot.dataset.index);
      }
    });
  }

  _moveSlides() {
    this.slides.forEach((slide) => {
      if (this.count < 0) {
        slide.style.transform = `translateX(-${100 * (this.slides.length - 1)}%)`;
        this.count = this.slides.length - 1;
      }

      if (this.count > this.slides.length - 1) {
        slide.style.transform = `translateX(0%)`;
        this.count = 0;
      }
      slide.style.transform = `translateX(-${100 * this.count}%)`;
    });

    this._toggleDots(this.count);
  }

  _toggleDots(count) {
    this.dots.forEach((dot) => {
      dot.classList.remove("card-slider__dot_active");
    });
    this.dots[count].classList.add("card-slider__dot_active");
  }

  static initAll({ selector = ".js-card-slider", parent = document } = {}) {
    parent.querySelectorAll(selector).forEach((item) => {
      new CardSlider().create(item);
    });
  }
}

CardSlider.initAll();
