<<<<<<< HEAD
import type { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";
=======

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { db } from '@/pages/api/instant'; // Ensure this is your server-side db access
import bcrypt from 'bcrypt'
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const signToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
};
>>>>>>> origin/main

const handleError = (res: NextApiResponse, status: number, message: string) => {
  res.status(status).json({ success: false, message });
};

<<<<<<< HEAD
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { email } = req.body;

  if (!email) {
    return handleError(res, 400, "Missing required fields");
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
      SELECT 
        users.*, 
        roles.role_name, 
        user_roles.role_id
      FROM 
        users
      LEFT JOIN 
        user_roles ON users.id = user_roles.user_id
      LEFT JOIN 
        roles ON user_roles.role_id = roles.id
      WHERE 
        users.email = 'valtermiguelwork@gmail.com'
      LIMIT 1;
  `;


    // 2. If the user exists, throw an error
    if (!user) {
      throw new Error("Email not Found");
    }

    return res
      .status(201)
      .json({  user });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ success: false, message: "Erro no login" });
=======

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, password } = req.body;


  try {
    // Find the user in the database by email

    const usersData = await db.query({ users: {} });
    const users = usersData.users;

    const existingUser = users.find((user) => user.email === email);
    if (!existingUser) {
      return handleError(res, 400, "Conta não existe");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return handleError(res, 400, 'E-mail ou senha inválidos');
    }

    const token = await db.auth.createToken(email);
    const rr = await signToken({id:existingUser.id, email:existingUser.email});

    console.log(rr)

    res.setHeader(
      'Set-Cookie',
      `accessToken=${token}; HttpOnly; Path=/; Max-Age=3600`
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro no login' });
>>>>>>> origin/main
  }
}
