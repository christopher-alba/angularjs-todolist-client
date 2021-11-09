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
      .when("/404", {
        template: "<not-found></not-found>",
      })
      .otherwise("/404");
  },
]);
