const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { signJwt, verifyBearer } = require("../middlewares/jwt.middlewares");

// lihttase: kontrollime vaid et on olemas username+password
router.post(
  "/login",
  [
    body("username").isString().trim().isLength({ min: 1 }).withMessage("username required"),
    body("password").isString().trim().isLength({ min: 1 }).withMessage("password required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;

    // DEMO: siin võiks teha päris kontrolli (DB + bcrypt).
    // Hetkel: kui parool mitte-tühi, lubame.
    // Näide: role=admin kui username === "admin", muidu "user".
    const role = username === "admin" ? "admin" : "user";

    // ÄRGE pange parooli tokenisse
    const token = signJwt({ username, role });

    return res.status(200).json({ token, username, role });
  }
);

// Kontrolli, et JWT on meie serveri poolt allkirjastatud ja kehtiv
router.get("/ping", verifyBearer, (req, res) => {
  // Kui siia jõudsime, token verifitseeriti edukalt
  res.json({ ok: true, user: req.user }); // { username, role, iat, exp }
});

module.exports = router;
