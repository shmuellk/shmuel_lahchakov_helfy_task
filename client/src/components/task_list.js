import React, { useEffect, useState } from "react";
import TaskItem from "./task_item";

const TaskList = ({ tasks, onUpdate, onDelete, onToggle }) => {
  const itemsPerPage = 3;
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(false);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  useEffect(() => {
    if (!tasks.length || editing) return; 
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [tasks, totalPages, editing]);

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  if (!tasks.length) return <p className="empty">No tasks yet</p>;

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${page * 100}%)`,
        }}
      >
        {Array.from({ length: totalPages }).map((_, i) => {
          const startIndex = i * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const visibleTasks = tasks.slice(startIndex, endIndex);
          return (
            <div className="carousel-page" key={i}>
              {visibleTasks.map((task) => (
                <div key={task.id} className="carousel-card">
                  <TaskItem
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onEditingChange={setEditing} 
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button onClick={prevPage} className="nav-btn">❮</button>
        <div className="indicators">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              className={`dot ${i === page ? "active" : ""}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
        <button onClick={nextPage} className="nav-btn">❯</button>
      </div>
    </div>
  );
};

export default TaskList;
