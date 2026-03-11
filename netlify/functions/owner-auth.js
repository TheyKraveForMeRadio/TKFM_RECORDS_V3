import jwt from 'jsonwebtoken';
import { success, failure } from './_response.js';

export async function handler(event) {

  if (event.httpMethod !== 'POST') {
    return failure('Method not allowed', 405);
  }

  const { password } = JSON.parse(event.body || '{}');

  if (password !== process.env.TKFM_OWNER_KEY) {
    return failure('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { role: 'owner' },
    process.env.TKFM_JWT_SECRET,
    { expiresIn: '6h' }
  );

  return success({ token });
}
