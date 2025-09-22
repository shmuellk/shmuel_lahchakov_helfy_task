let tasks = [];
let idCounter = 1;

const getTasks = (req, res) => {
    res.json(tasks);
};

const createTask = (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !priority) {
        return res.status(400).json({ error: "Title and priority are required" });
    }

    const newTask = {
        id: idCounter++,
        title,
        description: description || "",
        priority,
        completed: false,
        createdAt: new Date(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (typeof completed === "boolean") task.completed = completed;

    res.json(task);
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(index, 1);
    res.status(204).end();
};

const toggleTask = (req, res) => {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = !task.completed;
    res.json(task);
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask
};
