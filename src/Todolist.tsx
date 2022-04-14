import React, { ChangeEvent, useState, KeyboardEvent } from "react";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: Function;
  changeFilter: Function;
  addTask: (title: string) => void;
};

export function Todolist(props: TodolistPropsType) {
  const [newTaskTitile, setNewTaskTitile] = useState("");
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitile(e.currentTarget.value);
  };
  const onKeyPressHander = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitile);
      setNewTaskTitile("");
    }
  };

  const addTask = () => {
    props.addTask(newTaskTitile);
    setNewTaskTitile("");
  };

  const onAllClickHander = () => props.changeFilter("all");
  const onActiveClickHander = () => props.changeFilter("active");
  const onCompletedClickHander = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitile}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHander}
        />
        <button onClick={addTask}>+</button>
      </div>
      <div>
        <ul>
          {props.tasks.map((t) => {
            const onRemoveHandler = () => {
              props.removeTask(t.id);
            };
            return (
              <li key={t.id}>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}> X </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button onClick={onAllClickHander}>All</button>
        <button onClick={onActiveClickHander}>Active</button>
        <button onClick={onCompletedClickHander}>Component</button>
      </div>
    </div>
  );
}
