// pages/api/subscribe.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { getMockLockMaturity, sendNotification } from './check-maturity';

interface Subscription {
  id: string;
  email: string;
  fnftId: string;
}

// In-memory storage for subscriptions
const subscriptions: Record<string, Subscription> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, fnftId } = req.body;
    const subscriptionId = uuidv4();

    // Immediately check if the FNFT is mature
    const isMature = await getMockLockMaturity(fnftId);
    if (isMature) {
      await sendNotification(email, fnftId);
    }

    // Store the subscription whether mature or not
    subscriptions[subscriptionId] = { id: subscriptionId, email, fnftId };
    
    res.status(200).json({ subscriptionId, isMature });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
