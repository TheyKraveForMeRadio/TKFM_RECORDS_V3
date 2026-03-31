exports.ok = (data) => ({
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  },
  body: JSON.stringify(data)
});

exports.error = (err) => ({
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify({
    error: err.message || "unknown_error"
  })
});

exports.preflight = () => ({
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  }
});
