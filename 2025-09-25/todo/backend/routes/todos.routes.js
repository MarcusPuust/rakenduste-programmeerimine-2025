// routes/todos.routes.js
const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const todosController = require("../controllers/todos.controller");
const {
  todosRouteMiddleware,
  todosGetRouteMiddleware,
} = require("../middlewares/todos.middlewares");

const { validationResult } = require("express-validator");
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.use(todosRouteMiddleware);

// READ all (deleted:false ainult controlleris)
router.get("/", todosGetRouteMiddleware, todosController.read);

// READ one
router.get(
  "/:id",
  [param("id").isUUID().withMessage("invalid id")],
  validate,
  todosController.readOne
);

// CREATE
router.post(
  "/",
  [body("title").isString().trim().isLength({ min: 1 }).withMessage("title required")],
  validate,
  todosController.create
);

// UPDATE (täis)
router.put(
  "/:id",
  [
    param("id").isUUID().withMessage("invalid id"),
    body("title").isString().trim().isLength({ min: 1 }).withMessage("title required"),
    body("done").isBoolean().withMessage("done must be boolean"),
  ],
  validate,
  todosController.update
);

// PATCH (osaline uuendus)
router.patch(
  "/:id",
  [
    param("id").isUUID().withMessage("invalid id"),
    body("title").optional().isString().trim().isLength({ min: 1 }).withMessage("title must be non-empty"),
    body("done").optional().isBoolean().withMessage("done must be boolean"),
  ],
  validate,
  todosController.patch
);

// SOFT DELETE
router.patch(
  "/:id/delete",
  [param("id").isUUID().withMessage("invalid id")],
  validate,
  todosController.delete
);

module.exports = router;
