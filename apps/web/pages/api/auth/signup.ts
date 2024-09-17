// pages/api/auth/verify.ts
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
    return handleError(res, 405, "Method not allowed");
  }


  const payload = req.body;
  const { name, email, clerkId, roleName } = payload;

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    // Example check: ensure name, email, and clerkId are not empty
    if (!email || !name || !clerkId || !roleName) {
      return handleError(res, 400, "Missing required fields");
    }

    const existingUser = await sql`
      SELECT id FROM users
      WHERE email = ${email}
      LIMIT 1;
    `;

    // 2. If the user exists, throw an error
    if (existingUser.length > 0) {
      throw new Error("Email is already in use. Please use a different email.");
    }

    // 3. If the email is not in use, insert the new user
    const newUser = await sql`
  INSERT INTO users (
    name, 
    email, 
    clerk_id
  ) 
  VALUES (
    ${name}, 
    ${email},
    ${clerkId}
  )
  RETURNING id;
`;

    const userId = newUser[0].id; // Get the new user's ID

    // 4. Get the role ID from the 'roles' table where roleName matches
    const role = await sql`
  SELECT id FROM roles
  WHERE role_name = ${roleName}
  LIMIT 1;
`;

    // 5. Insert the user ID and role ID into the 'user_roles' table if the role exists
    if (role.length > 0) {
      const roleId = role[0].id;

      await sql`
    INSERT INTO user_roles (
      user_id, 
      role_id
    ) 
    VALUES (
      ${userId}, 
      ${roleId}
    );
  `;
    } else {
      throw new Error("Role not found.");
    }

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    return handleError(res, 500, "Internal server error");
  }
}
