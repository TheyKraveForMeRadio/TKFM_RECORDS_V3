export function ipGuard(event) {

  const allowedIPs =
    process.env.ADMIN_ALLOWED_IPS?.split(',') || [];

  const requestIP =
    event.headers['x-forwarded-for'];

  if(!allowedIPs.includes(requestIP)) {
    return false;
  }

  return true;
}
