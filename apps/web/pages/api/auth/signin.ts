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

  const { email, password } = req.body;

  if (!email || !password) {
    return handleError(res, 400, "Missing required fields");
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Fetch the user by email
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
        users.email = ${email}
      LIMIT 1;
    `;

    if (!user || user.length === 0) {
      return handleError(res, 404, "User not found");
    }

    // Here, add password verification logic if needed
    const userData = user[0];
    
    // Example password check (pseudo-code, replace with actual logic)
    if (password !== "expectedPassword") { // Replace with your password check
      return handleError(res, 401, "Invalid password");
    }

    return res.status(200).json({
      success: true,
      user: {
        email: userData.email,
        role_name: userData.role_name,
        clerkId: userData.clerk_id, // Ensure this is returned from your database
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return handleError(res, 500, "Server error");
  }
}
