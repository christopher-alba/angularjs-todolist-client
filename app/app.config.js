angular.module("myApp").config([
  "$routeProvider", "$locationProvider",
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when("/login", {
        template: "<login></login>",
      })
      .when("/signup", {
        template: "<signup></signup>",
      })
      .when("/todolist", {
        template: "<todolist></todolist>",
      })
      .when("/", {
        template: "<home></home>",
      })
      .otherwise({
        templateUrl: "Views/notFound/not-found.template.html",
      });
    
    $locationProvider.html5Mode(true);
    
  },
]);
