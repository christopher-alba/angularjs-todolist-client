angular.module("login").component("login", {
  templateUrl: "Views/login/login.template.html",
  controller: [
    "$location",
    "AuthenticationService",
    function Controller($location, AuthenticationService) {
      var vm = this;

      vm.login = login;
      vm.username = "";
      vm.password = "";

      initController();

      function initController() {
        // reset login status
        console.log("loggin user out");
        AuthenticationService.Logout();
      }

      function login() {
        if (vm.username === "" || vm.password === "") {
          vm.error = "You must enter a valid username and password to login";
          return;
        } else {
          vm.error = undefined;
        }
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
