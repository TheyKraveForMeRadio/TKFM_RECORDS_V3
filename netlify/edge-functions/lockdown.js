export default async (request, context) => {
  const headers = new Headers(request.headers);

  const isOwner =
    headers.get('x-tkfm-owner') === 'true' ||
    headers.get('X-TKFM-OWNER') === 'TRUE';

  if (!isOwner) {
    return new Response(null, {
      status: 444,
      headers: {
        'X-TKFM-BLACKOUT': 'ACTIVE'
      }
    });
  }

  headers.set('x-tkfm-blackout','BYPASSED');
  return fetch(new Request(request.url, {
    method: request.method,
    headers,
    body: request.body
  }));
};
