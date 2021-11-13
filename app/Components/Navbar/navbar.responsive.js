const navbarResponsive = () => {
  document
    .querySelector(".navbar-mobile .fas.fa-bars")
    .addEventListener("mousedown", navbarMenuToggle);
  document
    .querySelector(".navbar-mobile .fas.fa-bars")
    .addEventListener("keypress", navbarMenuToggleEnter);
  if (window.innerWidth < 800) {
    $(".navbar-desktop").hide();
    $(".navbar-mobile").show();
    applyMobileStyles();
  } else {
    $(".navbar-desktop").show();
    $(".navbar-mobile").hide();
    $(".navbar-menu").hide();
    removeMobileStyles();
  }
};

const navbarMenuToggle = () => {
  $(".navbar-menu").slideToggle();
};
const navbarMenuToggleEnter = (event) => {
  if (event.key === "Enter") {
    $(".navbar-menu").slideToggle();
  }
};

const applyMobileStyles = () => {
  $(".navbar-mobile").addClass("navbar-active");
};
const removeMobileStyles = () => {
  $(".navbar-mobile").removeClass("navbar-active");
};

window.onload = () => {
  setTimeout(() => {
    navbarResponsive();
    document
      .querySelector(".navbar-mobile .fas.fa-bars")
      .addEventListener("mousedown", navbarMenuToggle);
    document
      .querySelector(".navbar-mobile .fas.fa-bars")
      .addEventListener("keypress", navbarMenuToggleEnter);
  });
};
window.onscroll = navbarResponsive;
window.onresize = navbarResponsive;
