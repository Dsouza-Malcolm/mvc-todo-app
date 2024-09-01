import View from "../View";
import TodoItemView from "./todoItemView";

class TaskList extends View {
  _parentElement = document.getElementById("todo-list");
  #sortBtn = document.getElementById("sort");

  _generateMarkup() {
    this._parentElement.innerHTML = "";
    return this._data.map((task) => TodoItemView.render(task, false)).join("");
  }

  addHandlerTodoList(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerSortList(handler) {
    this.#sortBtn.addEventListener("change", function (e) {
      const { value } = e.target;
      if (!value) return;
      handler(value);
    });
  }
}

export default new TaskList();
