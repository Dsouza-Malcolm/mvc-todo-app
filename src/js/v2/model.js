import { INITIAL_STATE, LOCAL_STORAGE_KEY } from './config';
import { getDateStatus } from './helper';

class Model {
  constructor() {
    this.state = { ...INITIAL_STATE };
    // this.clearPersistTasks();
    this.init();
  }

  init() {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storage) this.state.tasks = JSON.parse(storage);
    this.applyFilterAndSort();
  }

  addTodo(newTask) {
    this.state.tasks.unshift(newTask);
    this.applyFilterAndSort();
    this.persistTasks();
    console.log(this.state.tasks);
  }

  updateTodo(updatedTask) {
    this.state.tasks = this.state.tasks.map((task) =>
      task.id === updatedTask.id
        ? {
            ...task,
            ...updatedTask,
            dueStatus: getDateStatus(updatedTask.dueDate),
          }
        : task
    );

    this.applyFilterAndSort();
    this.persistTasks();
    console.log(this.state.tasks);
  }

  deleteTodo(taskId) {
    this.state.tasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.applyFilterAndSort();
    this.persistTasks();
    console.log(this.state.tasks);
  }

  completeTodo(taskId) {
    this.state.tasks = this.state.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            isCompleted: true,
          }
        : task
    );

    this.applyFilterAndSort();
    this.persistTasks();
    console.log(this.state.tasks);
  }

  // FILTER & SORT FUNCTIONS
  functionsFilterAndSort = {
    all: () => true,
    active: (task) => !task.isCompleted,
    completed: (task) => task.isCompleted,
    upcoming: (task) =>
      task.dueStatus !== 'Today' && task.dueStatus !== 'Yesterday',
    priority: (a, b) =>
      parseInt(a.priority.slice(1)) - parseInt(b.priority.slice(1)),
  };

  applyFilterAndSort() {
    const selectedFilter = this.state.userSelectedFilter;
    const excludeCompletedTasks = (task) => !task.isCompleted;
    const excludeUpcomingTasks = (task) => task.dueStatus !== 'Upcoming';

    this.state.filteredTasks = this.state.tasks.filter(excludeCompletedTasks);

    const filterFunction =
      this.functionsFilterAndSort[selectedFilter] ||
      this.functionsFilterAndSort.priority;

    if (selectedFilter === 'recent') return;

    if (selectedFilter !== 'Upcoming')
      this.state.filteredTasks =
        this.state.filteredTasks.filter(excludeUpcomingTasks);

    if (selectedFilter === 'priority') {
      this.state.filteredTasks = [...this.state.filteredTasks].sort(
        filterFunction
      );
      return;
    }

    this.state.filteredTasks = this.state.tasks.filter(filterFunction);
  }

  getTaskById(taskId) {
    return this.state.tasks.find((task) => task.id === taskId);
  }

  setUserSelectedFilter(sortBy) {
    this.state.userSelectedFilter = sortBy;
    this.applyFilterAndSort();
    console.log(this.state);
  }

  persistTasks() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.tasks));
  }

  clearPersistTasks() {
    localStorage.clear(LOCAL_STORAGE_KEY);
  }
}

export default new Model();
