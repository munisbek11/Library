const BaseError = require("../utils/BeseError");

module.exports = function (err, req, res) {
  if (err instanceof BaseError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Server error" });
};