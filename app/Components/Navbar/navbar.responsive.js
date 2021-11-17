const navbarMenuToggle = () => {
  $(".navbar-menu").slideToggle();
};
const navbarMenuToggleEnter = (event) => {
  if (event.key === "Enter") {
    $(".navbar-menu").slideToggle();
  }
};

window.onload = () => {
  setTimeout(() => {
    document
      .querySelector(".navbar-mobile .fas.fa-bars")
      .addEventListener("mousedown", navbarMenuToggle);
    document
      .querySelector(".navbar-mobile .fas.fa-bars")
      .addEventListener("keypress", navbarMenuToggleEnter);
  });
};
