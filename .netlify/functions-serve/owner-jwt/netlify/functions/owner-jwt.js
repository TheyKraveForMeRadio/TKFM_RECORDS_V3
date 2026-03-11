// netlify/functions/owner-jwt.js
exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      role: "OWNER",
      permissions: ["ALL"],
      expires: "NEVER"
    })
  };
};
//# sourceMappingURL=owner-jwt.js.map
