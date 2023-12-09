export let nextId = 0;
export let initialTodos = [];

export function TodoReducer(tasks, action) {
  switch (action.type) {
    case "add_todo":
      return [
        ...tasks,
        {
          label: action.text,
          done: false,
          isEdit: false,
          timerRun: true,
          time: action.time,
          id: action.id,
          createdAt: Date.now(),
        },
      ];

    case "delete_todo":
      return tasks.filter((el) => el.id !== action.id);

    case "done_todo":
      return tasks.map((el) =>
        el.id === action.id ? { ...el, done: !el.done } : { ...el }
      );

    case "edit_todo":
      return tasks.map((el) =>
        el.id === action.id ? { ...el, isEdit: !el.isEdit } : { ...el }
      );

    case "clear_completed":
      return tasks.filter((el) => !el.done);

    case "submit_todo":
      return tasks.map((el) =>
        el.id === action.id
          ? { ...el, label: action.text, isEdit: !el.isEdit }
          : { ...el }
      );

    case "start_timer":
      return tasks.map((el) =>
        el.id === action.id ? { ...el, timerRun: true } : { ...el }
      );

    case "stop_timer":
      return tasks.map((el) =>
        el.id === action.id ? { ...el, timerRun: false } : { ...el }
      );

    case "timer_todo":
      return tasks.map((el) => {
        if (el.time === 0) {
          return el;
        }
        if (el.timerRun) {
          el.time = el.time - 1;
        }
        return el;
      });

    case "escape_todo":
      return tasks.map((el) =>
        el.isEdit ? { ...el, isEdit: !el.isEdit } : el
      );
    default:
      break;
  }
}
