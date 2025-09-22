function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
}

module.exports = errorHandler;