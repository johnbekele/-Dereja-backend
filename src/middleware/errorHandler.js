const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: true,
    message: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

export default errorHandler;
