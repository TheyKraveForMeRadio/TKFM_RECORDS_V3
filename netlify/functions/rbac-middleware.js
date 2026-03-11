import jwt from 'jsonwebtoken';

export function verifyRole(event, requiredRole) {

  const token = event.headers.authorization?.replace('Bearer ','');
  if(!token) return false;

  const decoded = jwt.verify(token, process.env.TKFM_JWT_SECRET);

  return decoded.role === requiredRole;
}
