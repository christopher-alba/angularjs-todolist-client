angular.module("todolist").component("todolist", {
  templateUrl: "Views/todolist/todolist.template.html",
  controller: [
    function Controller() {
      this.getLists = getLists;
      this.getListItems = getListItems;
      this.addList = addList;
      this.deleteList = deleteList;
      this.addListItem = addListItem;
      this.deleteListItem = deleteListItem;
    },
  ],
});
