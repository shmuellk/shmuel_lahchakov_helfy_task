import axios from "axios";

const API = "http://localhost:8080/api/tasks";

const getTasks = async (sort) => {
    const res = await axios.get(API);
    const tasks =res.data;
    const order = sort === 1
        ? { high: 1, medium: 2, low: 3 }
        : { high: 3, medium: 2, low: 1 };
    return tasks.sort((a, b) => order[a.priority] - order[b.priority]);
}

const createTask = async (task) => {
    const res = await axios.post(API, task);
    return res.data;
}

const updateTask = async (id, task) => {
    const res = await axios.put(`${API}/${id}`, task);
    return res.data;
}

const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
}

const toggleTask = async (id) => {
    const res = await axios.patch(`${API}/${id}/toggle`);
    return res.data;
}

const taskModel = {
    getTasks, createTask, updateTask, deleteTask, toggleTask
}

export default taskModel;