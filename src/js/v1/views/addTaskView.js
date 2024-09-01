import ModalView from "./modalView";
import TodoItemView from "./todoItemView";

class AddTaskView extends ModalView {
  #addBtn = document.getElementById("add-task-btn");

  constructor() {
    super();
    this._parentElement = document.getElementById("todo-list");
    this._addHandlerToggleModal();
  }

  _addHandlerToggleModal() {
    this.#addBtn.addEventListener("click", this._toggleModal.bind(this));
  }

  _generateMarkup() {
    return TodoItemView.render(this._data, false);
  }
}

export default new AddTaskView();
