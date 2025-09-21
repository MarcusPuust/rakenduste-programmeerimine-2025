const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send(
    "API up. See /api/items, /users/:userId/books/:bookId, /flights/:from-:to"
  );
});

// ---------- In-memory data ----------
let items = [
  { id: 1, title: "Learn React", done: true },
  { id: 2, title: "Build MUI layout", done: false },
];
let nextId = 3;

// ---------- CRUD: /api/items ----------

// CREATE
app.post("/api/items", (req, res) => {
  const { title, done = false } = req.body || {};
  if (!title) return res.status(400).json({ error: "title is required" });
  const newItem = { id: nextId++, title, done: Boolean(done) };
  items.push(newItem);
  res.status(201).json(newItem);
});

// READ (list)
app.get("/api/items", (_req, res) => {
  res.json(items);
});

// READ (detail)
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = items.find((i) => i.id === id);
  if (!found) return res.status(404).json({ error: "Item not found" });
  res.json(found);
});

// UPDATE (replace)
app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Item not found" });

  const { title, done } = req.body || {};
  if (typeof title !== "string" || typeof done !== "boolean") {
    return res.status(400).json({
      error: "title (string) and done (boolean) are required",
    });
  }
  items[idx] = { id, title, done };
  res.json(items[idx]);
});

// DELETE
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter((i) => i.id !== id);
  if (items.length === before)
    return res.status(404).json({ error: "Item not found" });
  res.status(204).send();
});

// ---------- Route parameters demos ----------

// MINIMAL: /users/:userId/books/:bookId
app.get("/users/:userId/books/:bookId", (req, res) => {
  const { userId, bookId } = req.params;
  res.json({
    message: "My users/books example",
    userId: Number.isNaN(Number(userId)) ? userId : Number(userId),
    bookId,
  });
});


app.get("/flights/:from-:to", (req, res) => {
  const from = String(req.params.from).toUpperCase();
  const to = String(req.params.to).toUpperCase();
  res.type("text/plain").send(`Flight from: ${from} to: ${to}`);
});


// ---------- EXAMPLES ----------

// In-memory näide + 404'd
const users = {
  7: {
    name: "Marcus Puust",
    books: {
      mp19: { title: "Kuidas testida postmani?", year: 2025, rating: 5 },
    },
  },
};

// GET /users/:userId/books/:bookId/summary
app.get("/users/:userId/books/:bookId/summary", (req, res) => {
  const { userId, bookId } = req.params;
  const user = users[userId];
  if (!user)
    return res
      .status(404)
      .json({ error: "User not found", userId: Number(userId) });

  const book = user.books[bookId];
  if (!book)
    return res
      .status(404)
      .json({ error: "Book not found", userId: Number(userId), bookId });

  res.json({
    userId: Number(userId),
    userName: user.name,
    bookId,
    ...book,
    summary: `“${book.title}” (${book.year}) — rating ${book.rating}/5`,
  });
});



app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
