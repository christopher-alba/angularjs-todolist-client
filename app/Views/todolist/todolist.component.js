angular.module("todolist").component("todolist", {
  templateUrl: "Views/todolist/todolist.template.html",
  controller: [
    "ToDoListService",
    "$window",
    function Controller(ToDoListService, $window) {
      const getLists = () => {
        if ($window.localStorage.currentUser !== undefined) {
          const username = JSON.parse(
            $window.localStorage.currentUser
          ).username;
          ToDoListService.getLists(username, (lists) => {
            this.lists = lists;
          });
        }
      };

      this.getLists = getLists;
      // this.getListItems = getListItems;
      // this.addList = addList;
      // this.deleteList = deleteList;
      // this.addListItem = addListItem;
      // this.deleteListItem = deleteListItem;
      // this.lists = [];
    },
  ],
});
