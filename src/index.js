import { React, useState, useEffect, useRef, useReducer } from "react";
import { createRoot } from "react-dom/client";

import Header from "./components/header";
import ToDoList from "./components/todo-list";
import Footer from "./components/footer";
import { all, active, completed } from "./components/filters";
import { nextId, initialTodos, TodoReducer } from "./components/todoReducer";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode);

function AppElements() {
  const [tasks, dispatch] = useReducer(TodoReducer, initialTodos);
  const [activeFilter, setActiveFilter] = useState(all);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch({
        type: "timer_todo",
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  });

  const stopTimer = (id) => {
    dispatch({
      type: "stop_timer",
      id,
    });
  };

  const startTimer = (id) => {
    dispatch({
      type: "start_timer",
      id,
    });
  };

  const chooseActiveFilter = (filterName) => {
    switch (filterName) {
      case all:
        setActiveFilter(filterName);
        break;
      case active:
        setActiveFilter(filterName);
        break;
      case completed:
        setActiveFilter(filterName);
        break;
      default:
        break;
    }
  };

  const addItem = (text, time) => {
    if (!text.length) {
      return;
    }
    dispatch({
      type: "add_todo",
      id: nextId++,
      text,
      time,
    });
  };

  const deleteItem = (id) => {
    dispatch({
      type: "delete_todo",
      id,
    });
  };

  const itemDone = (id) => {
    dispatch({
      type: "done_todo",
      id,
    });
  };

  const itemEdit = (id) => {
    dispatch({
      type: "edit_todo",
      id,
    });
  };

  const clearCompleted = () => {
    dispatch({
      type: "clear_completed",
    });
  };

  const onItemSubmit = (id, text) => {
    dispatch({
      type: "submit_todo",
      id,
      text,
    });
  };

  let itemsLeft = tasks.filter((el) => !el.done).length;

  return (
    <div className="todoapp">
      <Header onItemAdded={addItem} />
      <ToDoList
        activeFilter={activeFilter}
        onDeleted={deleteItem}
        onItemDone={itemDone}
        onItemEdit={itemEdit}
        clearCompleted={clearCompleted}
        onItemAdded={addItem}
        onItemSubmit={onItemSubmit}
        stopTimer={stopTimer}
        startTimer={startTimer}
        tasks={tasks}
        dispatch={dispatch}
      />
      <Footer
        itemsLeft={itemsLeft}
        activeFilter={activeFilter}
        chooseActiveFilter={chooseActiveFilter}
        clearCompleted={clearCompleted}
        all={all}
        active={active}
        completed={completed}
      />
    </div>
  );
}

root.render(<AppElements />);
