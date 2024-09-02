import View from '../View';
import icons from 'url:../../../img/icons.svg';

export default class TodoItemView extends View {
  _parentElement = document.getElementById('todo-container');

  _generateMarkup() {
    const markup = `
        <p class="flex items-center gap-1 mt-1">
          <svg class="w-3 h-3">
            <use
              class="stroke-green-500 stroke-2"
              href="${icons}#clock"
            ></use>
          </svg>
          <span class="text-xs font-medium text-green-500">${this._data.dueTime}</span>
        </p>
    `;

    const descMarkup = `
            <p class="text-black dark:text-white">${this._data.description}</p>
    `;

    const svgColor =
      this._data.priority === 'P1'
        ? 'stroke-red-500'
        : this._data.priority === 'P2'
        ? 'stroke-blue-600'
        : this._data.priority === 'P3'
        ? 'stroke-yellow-300'
        : 'stroke-gray-400';

    return `
      <li class="hover:bg-gray-100 dark:hover:bg-ocean cursor-pointer py-3 border-b dark:border-gray-700" data-id='${
        this._data.id
      }'>
        <div class="grid grid-cols-6">
          <div id="task-complete-btn" class="group justify-self-center self-center cursor-pointer">
            <svg class="w-5 h-5">
                <use
                  class="${svgColor} stroke-[4] group-hover:hidden transition-all"
                  href="${icons}#circle"
                ></use>
                <use
                  class="hidden group-hover:inline-block ${svgColor} stroke-[3] transition-all"
                  href="${icons}#circle-tick"
                ></use>
              </svg>
          </div>
          <div class="task-body col-span-4">
            <h3 class="font-bold dark:text-white text-base">${
              this._data.title
            }</h3>
            ${this._data.description ? descMarkup : ''}
            ${this._data.dueTime ? markup : ''}
          </div>
          <div id="delete-btn" class="justify-self-center self-center cursor-pointer group">
            <svg class="w-5 h-5">
              <use
                class="stroke-black/20 dark:stroke-white/60 dark:group-hover:stroke-white group-hover:stroke-black/60 stroke-2"
                href="${icons}#trash"
              ></use>
            </svg>
          </div>
        </div>
      </li>
    `;
  }

  addHandler(completeHandler, deleteHandler, updateHandler) {
    this._parentElement.addEventListener('click', function (e) {
      const taskBody = e.target.closest('.task-body');
      const completeBtn = e.target.closest('#task-complete-btn');
      const deleteBtn = e.target.closest('#delete-btn');
      const listItem = e.target.closest('li');
      const taskId = listItem.dataset.id;

      if (taskBody) return updateHandler(taskId);
      if (completeBtn) return completeHandler(taskId);
      if (deleteBtn) return deleteHandler(taskId);
    });
  }
}
