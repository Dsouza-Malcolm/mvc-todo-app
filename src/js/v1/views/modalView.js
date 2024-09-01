import { Modal } from "flowbite";
import { formatDate } from "../helper";
import View from "../View";

export default class ModalView extends View {
  #modalEl = document.getElementById("crud-modal");
  #datePicker = document.getElementById("datepicker-actions");
  #closeModalBtn = document.getElementById("modal-close-btn");
  #timeInputEl = document.getElementById("time");

  constructor() {
    super();
    this._modal = new Modal(this.#modalEl, {
      backdropClasses:
        "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40 modal-backdrop",
    });
    this._submitForm = document.getElementById("submit-form");

    this._addHandlerCloseModal();
  }

  _toggleModal() {
    this._modal.show();
  }

  _closeModal() {
    document.querySelector(".modal-backdrop")?.remove();
    this._modal.hide();
    this._clearForm();
  }

  _addHandlerCloseModal() {
    this.#closeModalBtn.addEventListener("click", this._closeModal.bind(this));
  }

  _datePickerSetMinDate() {
    this.#datePicker.setAttribute("datepicker-min-date", formatDate());
  }

  _clearForm() {
    this._submitForm.reset();
  }

  _addHandlerBindSubmit(addTaskHandler, updateTaskHandler) {
    this._submitForm.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();

        const dataArr = [...new FormData(this._submitForm)];
        const data = Object.fromEntries(dataArr);

        this._closeModal();
        this._submitForm.reset();

        if (data.id) return updateTaskHandler(data);
        addTaskHandler(data);
      }.bind(this)
    );
  }
}
