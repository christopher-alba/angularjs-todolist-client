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

      const getDaysRemaining = (dueDate) => {
        return Math.ceil(
          (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24)
        );
      };

      this.getDaysRemaining = getDaysRemaining;

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

      const deleteItem = (itemID) => {
        if ($window.localStorage.currentUser !== undefined) {
          const username = JSON.parse(
            $window.localStorage.currentUser
          ).username;
          ToDoListService.deleteListItem(
            username,
            this.selectedList._id,
            itemID,
            (response) => {
              this.listItems = this.listItems.filter(
                (item) => item._id !== itemID
              );
              this.lists = this.lists.map((list) => {
                if (list._id === this.selectedList._id) {
                  list.itemsIDs = list.itemsIDs.filter((id) => id !== itemID);
                }
                return list;
              });
            }
          );
        }
      };

      this.getLists = getLists;
      this.addList = addList;
      this.deleteList = deleteList;
      this.createItem = createItem;
      this.setSelectedList = setSelectedList;
      this.clearSelectedList = clearSelectedList;
      this.deleteItem = deleteItem;
      this.updateItemStatus = updateItemStatus;
    },
  ],
});
