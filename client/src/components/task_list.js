import React from "react";
import TaskItem from "./task_item";

const  TaskList = ({ tasks, onUpdate, onDelete, onToggle }) => {
  if (!tasks.length) return <p className="empty">No tasks yet</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
