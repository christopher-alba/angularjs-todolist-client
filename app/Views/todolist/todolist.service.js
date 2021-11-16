angular.module("todolist").factory("ToDoListService", [
  "$http",
  "$window",
  "Configuration",
  function Service($http, $window, Configuration) {
    var service = {};

    const getLists = (username, callback) => {
      $http({
        method: "GET",
        url: Configuration.API + username + "/lists",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          callback(response.data.lists);
        })
        .catch(() => {
          console.log(
            "The server route doesnt exist yet, sorry for the inconvenience."
          );
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

    const updateListItem = (item, username, itemID) => {
      $http({
        method: "PUT",
        url: Configuration.API + username + "/items/" + itemID,
        data: {
          ...item,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {});
    };

    const addList = (username, listname, callback) => {
      $http({
        method: "POST",
        url: Configuration.API + username + "/lists/",
        data: {
          name: listname,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        callback(response.data.lists);
      });
    };
    const deleteList = (username, listID, callback) => {
      $http({
        method: "DELETE",
        url: Configuration.API + username + "/lists/" + listID,
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        callback(response.data.response);
      });
    };
    const addListItem = (item, username, listID, callback) => {
      $http({
        method: "POST",
        url: Configuration.API + username + "/lists/" + listID,
        data: {
          ...item,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        callback(response.data.listItem);
      });
    };
    const deleteListItem = () => {};

    service.getLists = getLists;
    service.getListItems = getListItems;
    service.addList = addList;
    service.deleteList = deleteList;
    service.addListItem = addListItem;
    service.deleteListItem = deleteListItem;
    service.updateListItem = updateListItem;

    return service;
  },
]);
