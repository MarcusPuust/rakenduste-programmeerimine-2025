const { v4: uuid } = require("uuid");

const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
];

// CREATE
exports.create = (req, res) => {
  const cat = {
    id: uuid(),
    name: req.body.name,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };
  cats.push(cat);
  res.status(201).json(cat);
};

// READ all (peidame deleted:true)
exports.read = (req, res) => {
  res.json(cats.filter(c => !c.deleted));
};

// READ one
exports.readOne = (req, res) => {
  const cat = cats.find(c => c.id === req.params.id && !c.deleted);
  if (!cat) return res.status(404).json({ message: "Not found" });
  res.json(cat);
};

// UPDATE (täis-uuendus)
exports.update = (req, res) => {
  const cat = cats.find(c => c.id === req.params.id && !c.deleted);
  if (!cat) return res.status(404).json({ message: "Not found" });
  cat.name = req.body.name;
  cat.updatedAt = Date.now();
  res.json(cat);
};

// PATCH (osaline, valikuline)
exports.patch = (req, res) => {
  const cat = cats.find(c => c.id === req.params.id && !c.deleted);
  if (!cat) return res.status(404).json({ message: "Not found" });
  if (req.body.name) cat.name = req.body.name;
  cat.updatedAt = Date.now();
  res.json(cat);
};

// SOFT DELETE
exports.delete = (req, res) => {
  const cat = cats.find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ message: "Not found" });
  cat.deleted = true;
  cat.updatedAt = Date.now();
  res.json({ message: "Deleted (soft)", id: cat.id });
};
