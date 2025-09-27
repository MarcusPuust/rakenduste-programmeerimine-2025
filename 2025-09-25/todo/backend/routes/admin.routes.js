const express = require("express");
const { param, validationResult } = require("express-validator");
const router = express.Router();

const todosController = require("../controllers/todos.controller");
const { adminGuard } = require("../middlewares/admin.middlewares");

// lihtne validator helper
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// Kõik TODO-d (ka deleted:true)
router.get("/todos", adminGuard, todosController.adminReadAll);

// Toggle deleted
router.patch(
  "/todos/:id/toggle-deleted",
  adminGuard,
  [param("id").isUUID().withMessage("invalid id")],
  validate,
  todosController.toggleDeleted
);

module.exports = router;
