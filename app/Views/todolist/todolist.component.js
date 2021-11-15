angular.module("todolist").component("todolist", {
  templateUrl: "Views/todolist/todolist.template.html",
  controller: [
    "ToDoListService",
    "$window",
    function Controller(ToDoListService, $window) {
      this.lists = [];
      this.listname = "";
      this.selectedListID = "";

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

      getLists();

      const addList = () => {
        if ($window.localStorage.currentUser !== undefined) {
          const username = JSON.parse(
            $window.localStorage.currentUser
          ).username;
          ToDoListService.addList(username, this.listname, (list) => {
            this.lists.push(list);
          });
        }
      };

      const deleteList = (selectedListID) => {
        if ($window.localStorage.currentUser !== undefined) {
          const username = JSON.parse(
            $window.localStorage.currentUser
          ).username;
          ToDoListService.deleteList(username, selectedListID, (response) => {
            this.lists = this.lists.filter((list) => {
              return list._id !== selectedListID;
            });
          });
        }
      };

      this.getLists = getLists;
      // this.getListItems = getListItems;
      this.addList = addList;
      this.deleteList = deleteList;
      // this.addListItem = addListItem;
      // this.deleteListItem = deleteListItem;
      // this.lists = [];
    },
  ],
});
