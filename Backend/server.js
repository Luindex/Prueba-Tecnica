const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, title: "Demo item", completed: false }
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { title, completed } = req.body;
    const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = { id, title: title ?? "Untitled", completed: !!completed };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const t = tasks.find(x => x.id === id);
    if (!t) return res.status(404).json({ error: "Not found" });
    Object.assign(t, req.body);
    res.json(t);
});

app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const idx = tasks.findIndex(x => x.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    const removed = tasks.splice(idx, 1)[0];
    res.json(removed);
});

app.listen(port, () => {
    console.log(`TaskSync funcionando en http://localhost:${port}`);
});
