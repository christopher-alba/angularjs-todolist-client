angular.module("myApp").config([
  "$routeProvider",
  function config($routeProvider) {
    $routeProvider
      .when("/login", {
        template: "<login></login>",
      })
      .when("/signup", {
        template: "<signup></signup>",
      })
      .when("/todolist", {
        template: "<to-do-list></to-do-list>",
      })
      .when("/", {
        template: "<home></home>",
      })
      .otherwise({
        templateUrl: "Views/notFound/not-found.template.html",
      });
  },
]);
