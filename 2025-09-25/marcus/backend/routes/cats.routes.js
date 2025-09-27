// routes/cats.routes.js
const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const catsController = require("../controllers/cats.controller");
const {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
} = require("../middlewares/cats.middlewares");

// Lihtne valideerija -> 400 kui on vigu
const { validationResult } = require("express-validator");
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.use(catsRouteMiddleware);

// READ (all) — tagasta ainult deleted:false (tee see loogika controlleris)
router.get("/", catsGetRouteMiddleware, catsController.read);

// READ (one)
router.get(
  "/:id",
  [param("id").isUUID().withMessage("invalid id")],
  validate,
  catsController.readOne
);

// CREATE
router.post(
  "/",
  [body("name").isString().trim().isLength({ min: 1 }).withMessage("name required")],
  validate,
  catsController.create
);

// UPDATE (täis)
router.put(
  "/:id",
  [
    param("id").isUUID().withMessage("invalid id"),
    body("name").isString().trim().isLength({ min: 1 }).withMessage("name required"),
  ],
  validate,
  catsController.update
);

// UPDATE (osaline, soovi korral — nime muutmine)
router.patch(
  "/:id",
  [
    param("id").isUUID().withMessage("invalid id"),
    body("name").optional().isString().trim().isLength({ min: 1 }).withMessage("name must be non-empty"),
  ],
  validate,
  catsController.patch
);

// SOFT DELETE (deleted:true)
router.patch(
  "/:id/delete",
  [param("id").isUUID().withMessage("invalid id")],
  validate,
  // kui sinu controlleris on meetodi nimi "delete", jäta see:
  catsController.delete // või catsController.softDelete kui nii nimetasid
);

module.exports = router;
