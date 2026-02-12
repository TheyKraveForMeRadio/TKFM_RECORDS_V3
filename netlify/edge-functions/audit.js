export default async (request, context) => {
  console.log('EDGE AUDIT:', request.url);
  return fetch(request);
};
