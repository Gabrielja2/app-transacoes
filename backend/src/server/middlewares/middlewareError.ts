import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
};

export default errorHandler;