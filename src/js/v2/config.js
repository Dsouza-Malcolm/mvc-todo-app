export const TASK_TEMPLATE = {
  title: '',
  description: '',
  priority: '',
  dueDate: '',
  isCompleted: false,
};

export const INITIAL_STATE = {
  tasks: [],
  filteredTasks: [],
  userSelectedFilter: 'priority',
};

export const SORT_OPTIONS = {
  DUE_DATE: 'dueDate',
  PRIORITY: 'priority',
  RECENT: 'recent',
};

export const PRIORITY_COLORS = {
  P1: 'stroke-red-500',
  P2: 'stroke-blue-600',
  P3: 'stroke-yellow-300',
  P4: 'stroke-gray-400',
};

export const LOCAL_STORAGE_KEY = 'todoTasks';
