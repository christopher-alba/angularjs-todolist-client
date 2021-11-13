angular.module("login").component("login", {
  templateUrl: "Views/login/login.template.html",
  controller: [
    "$location",
    "AuthenticationService",
    function Controller($location, AuthenticationService) {
      var vm = this;

      vm.login = login;

      initController();

      function initController() {
        // reset login status
        AuthenticationService.Logout();
      }

      function login() {
        console.log("TESTING");
        vm.loading = true;
        AuthenticationService.Login(
          vm.username,
          vm.password,
          function (result) {
            if (result === true) {
              $location.path("/");
            } else {
              vm.error = "Username or password is incorrect";
              vm.loading = false;
            }
          }
        );
      }
    },
  ],
});
