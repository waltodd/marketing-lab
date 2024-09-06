// pages/api/auth/verify.ts

import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie"; // Import cookie parser

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Clear the cookie by setting its expiration date to the past
    res.setHeader("Set-Cookie", cookie.serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // Set to expire in the past
      path: "/", // Ensure the path is set to match the original cookie path
    }));

    console.log("User logged out");

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error Logout", error);
    res.status(500).json({ success: false, message: "Error logging out" });
  }
}
