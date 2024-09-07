// pages/api/auth/verify.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { db } from '@/pages/api/instant'; // Ensure this is your server-side db access
import bcrypt from 'bcrypt'
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const signToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, password } = req.body;


  try {
    // Find the user in the database by email

    const user = await db.query({
users:{$:{where:{email:email}}}
    })
    console.log(user)
     // Compare the provided password with the hashed password stored in the database

    //  if (!isPasswordValid) {
    //    return res.status(401).json({ message: 'Invalid email or password' });
    //  }

    // res.setHeader(
    //   'Set-Cookie',
    //   `accessToken=${token}; HttpOnly; Path=/; Max-Age=3600`
    // );

    // res.status(200).json({ success: true, user: { id, email: userEmail } });
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ success: false, message: 'Error verifying code' });
  }
}
