angular.module("todolist").factory("ToDoListService", [
  "$http",
  "$window",
  "Configuration",
  function Service($http, $window, Configuration) {
    var service = {};

    service.getLists = getLists;
    service.getListItems = getListItems;
    service.addList = addList;
    service.deleteList = deleteList;
    service.addListItem = addListItem;
    service.deleteListItem = deleteListItem;

    const getLists = (username, callback) => {
      $http({
        method: "GET",
        url: Configuration.API + username + "/lists",
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        callback(response.data.lists);
      });
    };
    const getListItems = (username, listID, callback) => {
      $http({
        method: "GET",
        url: Configuration.API + username + "/lists/" + listID,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        callback(response.data.listItems);
      });
    };
    const addList = () => {};
    const deleteList = () => {};
    const addListItem = () => {};
    const deleteListItem = () => {};

    return service;
  },
]);
