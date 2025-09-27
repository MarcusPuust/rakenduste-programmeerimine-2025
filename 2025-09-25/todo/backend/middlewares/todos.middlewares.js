const todosRouteMiddleware = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

const todosGetRouteMiddleware = (req, res, next) => {
  console.log("GET middleware (todos)");
  next();
};

module.exports = { todosRouteMiddleware, todosGetRouteMiddleware };
