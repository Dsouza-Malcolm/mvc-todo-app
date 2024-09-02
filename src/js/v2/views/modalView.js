import { Modal } from 'flowbite';
import { formatDate } from '../helper';

export default class ModalView {
  #modalEl = document.getElementById('crud-modal');
  #datePicker = document.getElementById('datepicker-actions');
  #closeModalBtn = document.getElementById('modal-close-btn');
  #addBtn = document.getElementById('add-task-btn');
  #submitForm = document.getElementById('submit-form');
  #modal;

  constructor() {
    // initialize Modal Instance from flowbite contructor
    this.#modal = new Modal(this.#modalEl, {
      backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40 modal-backdrop',
    });
    this._addHandlerCloseModal();
    this._addHandlerOpenModal();
    this._datePickerSetMinDate();
  }

  _OpenModal(task = null) {
    if (task instanceof Event) {
      task = null;
    }
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const prioritySelect = document.getElementById('priority');
    const dueDateInput = document.getElementById('datepicker-actions');
    const dueTimeInput = document.getElementById('time');
    const taskId = document.getElementById('task-id');
    const modalTitle = document.getElementById('modal-title');
    const modalBtnText = document.getElementById('modal-btn-text');

    if (task) {
      // Update modal
      taskId.value = task.id || '';
      titleInput.value = task.title || '';
      descriptionInput.value = task.description || '';
      prioritySelect.value = task.priority || 'P4';
      dueDateInput.value = task.dueDate || '';
      dueTimeInput.value = task.dueTime || '';
      modalTitle.textContent = 'Update Task';
      modalBtnText.textContent = 'Update Task';

      console.log('task');
    } else {
      console.log('else');
      modalTitle.textContent = 'Add new Task';
      modalBtnText.textContent = 'Add Task';
      this._clearForm();
    }

    this.#modal.show();
  }

  _closeModal() {
    // document.querySelector(".modal-backdrop")?.remove();
    this.#modal.hide();
    this._clearForm();
  }

  _clearForm() {
    this.#submitForm.reset();
  }

  addHandlerBindSubmit(addNewTaskHandler, updateTaskHandler) {
    this.#submitForm.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();

        const dataArr = [...new FormData(this.#submitForm)];
        const data = Object.fromEntries(dataArr);

        this._closeModal();
        this.#submitForm.reset();

        if (data.id) return updateTaskHandler(data);
        addNewTaskHandler(data);
      }.bind(this)
    );
  }

  _addHandlerCloseModal() {
    this.#closeModalBtn.addEventListener('click', this._closeModal.bind(this));
  }

  _addHandlerOpenModal() {
    this.#addBtn.addEventListener('click', this._OpenModal.bind(this));
  }

  _datePickerSetMinDate() {
    this.#datePicker.setAttribute('datepicker-min-date', formatDate());
  }

  _generateMarkup() {
    return TodoItemView.render(this._data, false);
  }
}
