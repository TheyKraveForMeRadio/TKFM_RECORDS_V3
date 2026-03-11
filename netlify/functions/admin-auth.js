import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from './supabase.js';

export async function handler(event) {

  const { email, password } = JSON.parse(event.body);

  const { data: user } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ success:false }) };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { statusCode: 401, body: JSON.stringify({ success:false }) };
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.TKFM_JWT_SECRET,
    { expiresIn: '4h' }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ success:true, data:{ token } })
  };
}
