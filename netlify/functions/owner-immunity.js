exports.handler = async (event, context) => {
  const headers = event.headers || {};
  const ownerKey =
    headers['x-tkfm-owner'] ||
    headers['X-TKFM-OWNER'] ||
    event.queryStringParameters?.owner;

  if (ownerKey === 'true') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        owner: true,
        immunity: 'FULL',
        message: 'SERVER IMMUNITY ACTIVE'
      })
    };
  }

  return {
    statusCode: 403,
    body: JSON.stringify({
      error: 'OWNER ONLY'
    })
  };
};
