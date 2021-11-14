angular.module("signup").component("signup", {
  templateUrl: "Views/signup/signup.template.html",
  controller: [
    "$location",
    "AuthenticationService",
    function Controller($location, AuthenticationService) {
      var vm = this;

      vm.signup = signup;
      vm.username = "";
      vm.password = "";

      function signup() {
        if (vm.username === "" || vm.password === "") {
          vm.error = "You must enter a valid username and password to signup";
          return;
        } else {
          vm.error = undefined;
        }
        vm.loading = true;
        AuthenticationService.Signup(
          vm.username,
          vm.password,
          function (result) {
            if (result === true) {
              $location.path("/");
            } else {
              vm.error = "Username is already taken, try another username.";
              vm.loading = false;
            }
          }
        );
      }
    },
  ],
});
