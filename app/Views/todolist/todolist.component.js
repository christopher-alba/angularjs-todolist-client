angular.module("todolist").component("todolist", {
  templateUrl: "Views/todolist/todolist.template.html",
  controller: [
    "ToDoListService",
    "$window",
    function Controller(ToDoListService, $window) {
      this.lists = [];
      this.selectedList = undefined;
      this.listname = "";
      this.selectedListID = "";
      this.username = JSON.parse($window.localStorage.currentUser).username;
      this.listItems = [];

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

      const setSelectedList = (list) => {
        if ($window.localStorage.currentUser !== undefined) {
          this.selectedList = list;
          const username = JSON.parse(
            $window.localStorage.currentUser
          ).username;
          ToDoListService.getListItems(username, list._id, (listItems) => {
            this.listItems = listItems;
          });
        }
      };

      const clearSelectedList = () => {
        this.selectedList = undefined;
      };

      this.getLists = getLists;
      // this.getListItems = getListItems;
      this.addList = addList;
      this.deleteList = deleteList;
      // this.addListItem = addListItem;
      // this.deleteListItem = deleteListItem;
      this.setSelectedList = setSelectedList;
      this.clearSelectedList = clearSelectedList;
    },
  ],
});
