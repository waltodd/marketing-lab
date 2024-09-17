import type { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";

const handleError = (res: NextApiResponse, status: number, message: string) => {
  res.status(status).json({ success: false, message });
};

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
  }
}
