export default class FilterTodoView {
  #sortBtn = document.getElementById('sort');

  addHandlerSortList(handler) {
    this.#sortBtn.addEventListener('change', function (e) {
      const { value } = e.target;
      if (!value) return;
      handler(value);
    });
  }
}
