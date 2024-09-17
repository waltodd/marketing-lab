import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../instant"; // Adjust this import according to your project structure

const secretKey = process.env.JWT_SECRET || "your-secret-key";

export default async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get the token from the cookies on the server side
    const token = req.cookies["accessToken"]; // Extract token from cookies

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey) as {
      id: string;
      email: string;
    };

    // Fetch the user from the database using decoded token info (e.g., email)
    const user = await db.auth.getUser({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data in the response
    const data = await db.query({
      users: {
        $: {
          where: {
            email: `${user.email}`,
          },
        },
        user_roles: {
             
        },
      },
    });

    const currentUser = data.users[0];

    return res.status(200).json(currentUser );
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
