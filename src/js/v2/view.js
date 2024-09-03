export default class View {
  _data;
  #svgIcon = document.getElementById('tick-circle');
  #taskCount = document.getElementById('tasks-remaining');

  render(data, render = true) {
    this._data = data;
    if (Array.isArray(this._data)) this.displayTaskCount();

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._parentElement.innerHTML = '';
    this._parentElement.appendChild(markup);
  }

  displayTaskCount() {
    const totalTask = this._data.length;

    if (totalTask > 0) {
      this.#svgIcon.classList.remove('opacity-0');
      this.#taskCount.textContent = `${totalTask} Task${
        totalTask > 1 ? 's' : ''
      }`;
    }

    if (totalTask === 0) {
      this.#svgIcon.classList.add('opacity-0');
      this.#taskCount.textContent = '';
    }
  }
}
