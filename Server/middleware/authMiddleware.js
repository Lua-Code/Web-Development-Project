const authMiddleware = (req, res, next) => {

  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  req.userId = req.session.userId;
  next();
};

export default authMiddleware;
