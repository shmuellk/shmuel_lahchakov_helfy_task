import React, { useState,useEffect} from "react";

const TaskItem =({ task, onUpdate, onDelete, onToggle,onEditingChange  })=> {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  useEffect(() => {
    if (onEditingChange) {
      onEditingChange(isEditing);
    }
  }, [isEditing, onEditingChange]);

  const handleSave=() =>{
    onUpdate(task.id, { ...task, title, description, priority });
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.priority} ${task.completed ? "done" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="btn save" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div className="view-mode">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span className="priority">Priority: {task.priority}</span>
        </div>
      )}
      <div className="actions">
        <button onClick={() => setIsEditing(!isEditing)} className="btn">
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button onClick={() => onToggle(task.id)} className="btn">
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onDelete(task.id)} className="btn danger">
            Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
