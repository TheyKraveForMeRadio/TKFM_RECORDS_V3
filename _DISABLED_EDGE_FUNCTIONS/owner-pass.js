export default async (request, context) => {
  const url = new URL(request.url);

  const headers = new Headers(request.headers);
  headers.set('x-tkfm-owner','true');
  headers.set('x-tkfm-edge','ENFORCED');
  headers.set('x-tkfm-site','records');

  return fetch(new Request(url, {
    method: request.method,
    headers,
    body: request.body
  }));
};
