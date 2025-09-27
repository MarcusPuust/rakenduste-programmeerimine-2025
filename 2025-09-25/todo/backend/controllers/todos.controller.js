const { v4: uuid } = require("uuid");

const todos = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    title: "Learn Node.js",
    done: false,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
  {
    id: "b2c3d4e5-f6a7-8901-2345-6789abcdef01",
    title: "Build TODO app",
    done: true,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
];

// CREATE
exports.create = (req, res) => {
  const todo = {
    id: uuid(),
    title: req.body.title,
    done: false,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
};

// READ all (peidame deleted:true)
exports.read = (req, res) => {
  res.json(todos.filter(t => !t.deleted));
};

// READ one
exports.readOne = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id && !t.deleted);
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
};

// UPDATE (täis-uuendus)
exports.update = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id && !t.deleted);
  if (!todo) return res.status(404).json({ message: "Not found" });
  todo.title = req.body.title;
  todo.done = req.body.done ?? todo.done;
  todo.updatedAt = Date.now();
  res.json(todo);
};

// PATCH (osaline uuendus)
exports.patch = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id && !t.deleted);
  if (!todo) return res.status(404).json({ message: "Not found" });
  if (req.body.title) todo.title = req.body.title;
  if (typeof req.body.done === "boolean") todo.done = req.body.done;
  todo.updatedAt = Date.now();
  res.json(todo);
};

// SOFT DELETE
exports.delete = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  todo.deleted = true;
  todo.updatedAt = Date.now();
  res.json({ message: "Deleted (soft)", id: todo.id });
};
