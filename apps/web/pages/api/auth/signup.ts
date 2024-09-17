// pages/api/auth/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
<<<<<<< HEAD
import { neon } from "@neondatabase/serverless";
=======
import jwt from "jsonwebtoken";
import { db, tx, id } from "@/pages/api/instant"; // Ensure this is your server-side db access
import bcrypt from "bcrypt";
const secretKey = process.env.JWT_SECRET || "your-secret-key";
const signToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
};
>>>>>>> origin/main
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
<<<<<<< HEAD

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
=======
  const { email, password, selectedRole } = req.body;

  try {
    // Check if email exits
    const usersData = await db.query({ users: {} });
    const users = usersData.users;

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return handleError(res, 400, "O e-mail já está registrado");
    }

    // Fetch all available roles from the database
    const rolesData = await db.query({ roles: {} });
    const roles = rolesData.roles;

    //Find role ID based on the selectedRole
    const role = roles.find((role) => role.role === selectedRole);

    if (!role) {
      return handleError(res, 400, "Função inválida selecionada");
    }

    // Hash the password before saving it to the database
    // 10 rounds of hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user

    const userId = id();
    const newUser = await db.transact([
      tx.users[userId].update({
        email: email,
        password: hashedPassword,
        createdAt: new Date(),
      }),
    ]);

    // Assign the role to the user

    await db.transact([
      tx.user_roles[id()].update({
        userId: userId,
        roleId: role.id,
      }),
    ]);

>>>>>>> origin/main
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    return handleError(res, 500, "Internal server error");
  }
}
