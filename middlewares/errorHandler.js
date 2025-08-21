// Global error handler middleware
function errorHandler(err, req, res, next) {
    console.error('❌ Global Error:', err.stack || err);

    // Send consistently  JSON response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;
