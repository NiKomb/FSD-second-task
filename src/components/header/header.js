const onMenuIconClick = () => {
  document
    .querySelector(".js-header__nav")
    .classList.toggle("header__nav_is-open");
  document
    .querySelector(".js-header__toggle")
    .classList.toggle("header__toggle_active");
};

const init = () => {
  const menuIcon = document.querySelector(".js-header__toggle");
  if (menuIcon) menuIcon.addEventListener("click", onMenuIconClick);
};

export default {
  init,
};
