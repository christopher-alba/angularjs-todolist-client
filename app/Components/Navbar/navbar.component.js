angular.module("myApp").component("navbar", {
  templateUrl: "Components/Navbar/navbar.template.html",
  controller: [
    "$location",
    function NavbarController($location) {
      this.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    },
  ],
});
