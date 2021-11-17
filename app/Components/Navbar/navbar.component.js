angular.module("myApp").component("navbar", {
  templateUrl: "Components/Navbar/navbar.template.html",
  controller: [
    "$location",
    "$window",
    "AuthenticationService",
    function NavbarController($location, $window, AuthenticationService) {
      this.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
      this.loggedIn = function () {
        return $window.localStorage.currentUser !== undefined;
      };
      this.logout = function () {
        AuthenticationService.Logout(function () {
          $location.path("/");
        });
      };

      const toggleNav = () => {
        $(".navbar-menu").slideToggle();
      };

      const toggleNavEnter = (event) => {
        if (event.key === "Enter") {
          $(".navbar-menu").slideToggle();
        }
      };

      this.toggleNav = toggleNav;
      this.toggleNavEnter = toggleNavEnter;
    },
  ],
});
