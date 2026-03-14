const { decryptData } = require("../utils/encryption");

const decryptMiddleware = (req, res, next) => {
  try {
    if (req.body && req.body.data) {
      req.body = decryptData(req.body.data);
    }
    next();
  } catch (error) {
    console.error("Decrypt middleware error:", error);
    return res
      .status(400)
      .json({ success: false, message: "Invalid encrypted payload" });
  }
};

module.exports = decryptMiddleware;
