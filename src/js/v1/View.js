export default class View {
  _data;
  _tasksRemaining = document.getElementById("tasks-remaining");

  render(data, render = true) {
    if (Array.isArray(data) && data.length === 0) {
      this._parentElement.innerHTML = "";
      this._tasksRemaining.innerHTML = "";
      return;
    }

    if (Array.isArray(data))
      this._tasksRemaining.innerHTML = `${data.length} tasks`;

    console.log(this._data);
    console.log(Array.isArray(this._data));

    if (!data) return;
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
