
import React, { useEffect, useState } from "react";
import "./App.css";
import taskModel from "./model/task_model";
import TaskList from "./components/task_list";
import TaskForm from "./components/task_form";
import TaskFilter from "./components/task_filter";

const App =() => {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState(1);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async() =>{
    const data = await taskModel.getTasks();
    setTasks(sortTasks(data, sort));
  }

  const sortTasks = (data, sortValue)=>{
    const order =
      sortValue === 1
        ? { high: 1, medium: 2, low: 3 }
        : { high: 3, medium: 2, low: 1 };

    return [...data].sort(
      (a, b) => order[a.priority] - order[b.priority]
    );
  }

  const toggleSort =()=>{
    const newSort = sort === 1 ? 0 : 1;
    setSort(newSort);
    setTasks(sortTasks(tasks, newSort));
  }

  const handleAdd = async(task) => {
    const newTask = await taskModel.createTask(task);
    setTasks([...tasks, newTask]);
  }

  const handleUpdate = async (id, updated) => {
    const task = await taskModel.updateTask(id, updated);
    setTasks(tasks.map((t) => (t.id === id ? task : t)));
  }

  const handleDelete = async(id) => {
    await taskModel.deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const handleToggle = async(id) => {
    const task = await taskModel.toggleTask(id);
    setTasks(tasks.map((t) => (t.id === id ? task : t)));
  }

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);

  return (
    <div className="app">
      <h1>Task Manager </h1>
      <TaskForm onAdd={handleAdd} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <button className="btn sort" onClick={toggleSort}>
        Sort : {sort === 1 ? "High → Low" : "Low → High"}
      </button>
      <TaskList
        tasks={filteredTasks}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default App;
