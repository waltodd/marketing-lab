import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/pages/api/instant'; // Your server-side database instance


  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const token = req.cookies['accessToken'] // Extract the token from the Bearer header
  
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }
    // console.log(token)
  
    // Verify the token
    const user = await db.auth.verifyToken(token)
  
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. Invalid token' });
    }

    // console.log(user)
  
    // Continue with the logic if the user is authenticated
    try {
      const someData = req.body.someData;
      
      // Perform your business logic here
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }