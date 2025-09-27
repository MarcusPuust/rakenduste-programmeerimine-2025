// Very minimal "auth": X-Admin-Token peab olema "devadmin" või process.env.ADMIN_TOKEN
const adminGuard = (req, res, next) => {
  const token = req.header("x-admin-token");
  const ok = token === "devadmin" || token === process.env.ADMIN_TOKEN;
  if (!ok) return res.status(401).json({ message: "Unauthorized" });
  next();
};

module.exports = { adminGuard };
