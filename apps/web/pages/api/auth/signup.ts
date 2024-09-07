// pages/api/auth/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { db, tx, id } from "@/pages/api/instant"; // Ensure this is your server-side db access
import bcrypt from "bcrypt";
const secretKey = process.env.JWT_SECRET || "your-secret-key";
const signToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
};
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

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    return handleError(res, 500, "Internal server error");
  }
}
