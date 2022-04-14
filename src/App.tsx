import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

export type FilterValueType = "all" | "component" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "TS", isDone: true },
    { id: v1(), title: "Redax", isDone: false },
  ]);

  console.log(tasks);

  let [filter, setFilter] = useState<FilterValueType>("all");

  const removeTask = (id: string) => {
    let filterTasks = tasks.filter((t) => t.id !== id);
    setTasks(filterTasks);
  };

  const addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;

  if (filter === "component") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone !== true);
  }

  return (
    <div className="App">
      <Todolist
        title={"What to learn"}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
