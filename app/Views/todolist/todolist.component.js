angular.module("todolist").component("todolist", {
  templateUrl: "Views/todolist/todolist.template.html",
  controller: [
    "ToDoListService",
    "$window",
    function Controller(ToDoListService, $window) {
      this.lists = [];
      this.selectedList = undefined;
      this.listname = "";
      this.listItems = [];

      this.itemName = "";
      this.itemDueDate = undefined;

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

      const updateItemStatus = (event, itemID) => {
        if ($window.localStorage.currentUser !== undefined) {
          this.listItems = this.listItems.map((item) => {
            if (item._id === itemID) {
              item.status = event.target.checked ? "COMPLETE" : "IN PROGRESS";
            }
            return item;
          });

          const item = this.listItems.find((item) => item._id === itemID);
          const username = JSON.parse(
            $window.localStorage.currentUser
          ).username;
          ToDoListService.updateListItem(item, username, itemID);
        }
      };

      const createItem = () => {
        if ($window.localStorage.currentUser !== undefined) {
          const username = JSON.parse(
            $window.localStorage.currentUser
          ).username;
          const item = {
            text: this.itemName,
            dateDue: this.itemDueDate,
          };
          ToDoListService.addListItem(
            item,
            username,
            this.selectedList._id,
            (listItem) => {
              this.listItems.push(listItem);
            }
          );
        }
      };

      this.getLists = getLists;
      // this.getListItems = getListItems;
      this.addList = addList;
      this.deleteList = deleteList;
      this.createItem = createItem;
      // this.deleteListItem = deleteListItem;
      this.setSelectedList = setSelectedList;
      this.clearSelectedList = clearSelectedList;

      this.updateItemStatus = updateItemStatus;
    },
  ],
});
