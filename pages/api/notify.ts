// pages/api/notify.ts

// an API route to handle incoming notifications from the event listener

import { NextApiRequest, NextApiResponse } from 'next';
import { sendNotification } from './check-maturity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { description } = req.body;
    // You would fetch the user's email based on the lockId or description from your database
    const userEmail = /* ...fetch from your database... */;
    await sendNotification(userEmail, description);
    res.status(200).json({ message: 'Notification sent successfully' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}