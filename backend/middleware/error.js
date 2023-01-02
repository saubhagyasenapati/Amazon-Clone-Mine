const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.name === "CastError") {
    const message = `Resource not found.Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate${Object.keys(err.keyValue)}  Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Web Token Invalid ,Try Again`;
    err = new ErrorHandler(message, 400);
  }
  //JWT EXPIRE error
  if (err.name === "TokenExpireError") {
    const message = `Web Token Expired ,Try Again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};
