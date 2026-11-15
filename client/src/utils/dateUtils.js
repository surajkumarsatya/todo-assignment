
export const getTodayDate = () => {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
};

export const parseDate = (value) => {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
};

export const toDateKey = (date) => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

export const getLocalDateTime = (value) => {
  if (!value) return "";

  const date = new Date(value);
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 16);
};

export const getMonday = (dateValue) => {
  const date = parseDate(dateValue);

  date.setHours(0, 0, 0, 0);

  const day = date.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  date.setDate(date.getDate() + difference);

  return date;
};

export const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

export const getCalendarDays = (dateValue) => {
  const monday = getMonday(dateValue);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);

    date.setDate(monday.getDate() + index);

    return {
      day: date.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      date: date.getDate(),
      fullDate: toDateKey(date),
    };
  });
};

export const groupTasksByWeek = (tasks) => {
  const groups = {};

  tasks.forEach((task) => {
    const monday = getMonday(task.startAt);
    const sunday = new Date(monday);

    sunday.setDate(monday.getDate() + 6);

    const weekKey = toDateKey(monday);

    if (!groups[weekKey]) {
      groups[weekKey] = {
        key: weekKey,
        start: monday,
        end: sunday,
        tasks: [],
      };
    }

    groups[weekKey].tasks.push(task);
  });

  return Object.values(groups).sort(
    (a, b) => b.start - a.start
  );
};
