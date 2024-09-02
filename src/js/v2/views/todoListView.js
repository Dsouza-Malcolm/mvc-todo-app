import View from '../View';
import TodoItemView from './TodoItemView';

export default class TodoListView extends View {
  _parentElement = document.getElementById('todo-container');

  constructor() {
    super();
    this.todoItemView = new TodoItemView();
  }

  _generateMarkup() {
    this._parentElement.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this._data.forEach((task) => {
      const markup = this.todoItemView.render(task, false);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = markup;
      fragment.appendChild(tempDiv.firstElementChild);
    });

    // this._parentElement.appendChild(fragment);
    return fragment;
  }

  addHandlerTodoList(handler) {
    window.addEventListener('load', handler);
  }
}
