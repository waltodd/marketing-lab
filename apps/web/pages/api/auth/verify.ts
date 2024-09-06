// pages/api/auth/verify.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { db } from '@/pages/api/instant'; // Ensure this is your server-side db access

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const signToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;

  try {
    const result = await db.auth.signInWithMagicCode({ email, code });
    const { id, email: userEmail } = result.user;

    const token = signToken({ id, email: userEmail });


    res.setHeader(
      'Set-Cookie',
      `authToken=${token}; HttpOnly; Path=/; Max-Age=3600`
    );

    res.status(200).json({ success: true, user: { id, email: userEmail } });
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ success: false, message: 'Error verifying code' });
  }
}
