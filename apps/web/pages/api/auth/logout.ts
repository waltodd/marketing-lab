
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../instant';


const handleError = (res: NextApiResponse, status: number, message: string) => {
  res.status(status).json({ success: false, message });
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    
  // await db.auth.signOut()
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro no login' });
  }
}
