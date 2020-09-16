const onContentLoad = () => {
  document.body.classList.remove("main_is-inactive");
  document
    .querySelector(".js-main__loader")
    .classList.add("main__loader_is-inactive");
};

const init = () => {
  window.addEventListener("load", onContentLoad);
};

export default {
  init,
};
