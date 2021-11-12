const navbarResponsive = () => {
  console.log("TESTING A");
  if (window.innerWidth < 750) {
    console.log("TESTING B");
    console.log($(".navbar-desktop"));
    $(".navbar-desktop").hide();
    $(".navbar-mobile").show();
    applyMobileStyles();
  } else {
    $(".navbar-desktop").show();
    $(".navbar-mobile").hide();
    removeMobileStyles();
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
  });
};
window.onscroll = navbarResponsive;
window.onresize = navbarResponsive;
