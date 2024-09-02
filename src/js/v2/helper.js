export const formatDate = () => {
  const today = new Date();
  const date = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear());
  return `${month}/${date}/${year}`;
};

export const generateUniqueId = (length = 10) => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return Date.now().toString(16) + id;
};

export const convertTo12HourFormat = (time24) => {
  let [hours, minutes] = time24.split(':');

  hours = parseInt(hours);

  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
};

export const getDateStatus = (dueDate) => {
  if (!dueDate) return 'Today';

  const today = new Date();
  const due = new Date(dueDate);
  console.log('Due Date Status ', due);

  // Extract year, month, and day components of both dates
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const dueYear = due.getFullYear();
  const dueMonth = due.getMonth();
  const dueDay = due.getDate();

  // Compare both date components
  let result;
  switch (true) {
    case todayYear === dueYear &&
      todayMonth === dueMonth &&
      todayDay === dueDay:
      result = 'Today';
      break;
    case dueYear < todayYear ||
      (todayYear === dueYear && dueMonth < todayMonth) ||
      (todayYear === dueYear && todayMonth === dueMonth && dueDay < todayDay):
      result = 'Yesterday';
      break;
    default:
      result = 'Upcoming';
  }

  return result;
};
