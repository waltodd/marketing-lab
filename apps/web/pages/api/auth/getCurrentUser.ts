
import { NextApiRequest, NextApiResponse } from "next";
// Adjust this import according to your project structure

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
    

    return res.status(200).json({});
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
