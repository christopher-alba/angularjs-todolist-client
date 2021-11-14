"use strict";
// Declare app level module which depends on views, and core components
const app = angular.module("myApp", [
  "ngRoute",
  "ngResource",
  "not-found",
  "home",
  "todolist",
  "login",
]);

app.service("Configuration", function () {
  if (window.location.host.includes("localhost")) {
    return (this.API = "http://localhost:3000/");
  } else {
    return (this.API = "https://todolist-server.herokuapp.com/");
  }
});

app.factory("AuthenticationService", [
  "$http",
  "$window",
  "Configuration",
  function Service($http, $window, Configuration) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.Signup = Signup;

    return service;

    function Signup(username, password, callback) {
      $http({
        method: "POST",
        url: Configuration.API + "auth/register",
        data: {
          username,
          password,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          console.log(response);
          // login successful if there's a token in the response
          if (response.data.token) {
            // store username and token in local storage to keep user logged in between page refreshes
            $window.localStorage.currentUser = JSON.stringify({
              username: username,
              token: response.data.token,
            });

            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization =
              "Bearer " + response.data.token;

            // execute callback with true to indicate successful login
            callback(true);
          } else {
            // execute callback with false to indicate failed login
            callback(false);
          }
        })
        .catch(() => {
          console.log("Server is offline, sorry for the inconvenience.");
        });
    }

    function Login(username, password, callback) {
      $http({
        method: "POST",
        url: Configuration.API + "auth/login",
        data: {
          username,
          password,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          console.log(response);
          // login successful if there's a token in the response
          if (response.data.token) {
            // store username and token in local storage to keep user logged in between page refreshes
            $window.localStorage.currentUser = JSON.stringify({
              username: username,
              token: response.data.token,
            });

            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization =
              "Bearer " + response.data.token;

            // execute callback with true to indicate successful login
            callback(true);
          } else {
            // execute callback with false to indicate failed login
            callback(false);
          }
        })
        .catch(() => {
          console.log("Server is offline, sorry for the inconvenience.");
        });
    }

    function Logout() {
      // remove user from local storage and clear http auth header
      delete $window.localStorage.currentUser;
      $http.defaults.headers.common.Authorization = "";
    }
  },
]);
