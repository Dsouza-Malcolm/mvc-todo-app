import ModalView from "./modalView";

class UpdateTaskView extends ModalView {
  constructor() {
    super();
  }

  updateTaskModal(task) {
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const prioritySelect = document.getElementById("priority");
    const dueDateInput = document.getElementById("datepicker-actions");
    const dueTimeInput = document.getElementById("time");
    const id = document.getElementById("id");

    id.value = task.id || "";
    titleInput.value = task.title || "";
    descriptionInput.value = task.description || "";
    prioritySelect.value = task.priority || "";
    dueDateInput.value = task.dueDate || "";
    dueTimeInput.value = task.dueTime || "";

    this._modal.show();
  }
}

export default new UpdateTaskView();
