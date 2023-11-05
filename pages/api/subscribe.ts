// pages/api/subscribe.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

interface Subscription {
  id: string;
  email: string;
  fnftId: string;
}

// In-memory storage for subscriptions
const subscriptions: Record<string, Subscription> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, fnftId } = req.body;
    const subscriptionId = uuidv4();

    // Store the subscription
    subscriptions[subscriptionId] = { id: subscriptionId, email, fnftId };
    
    res.status(200).json({ subscriptionId });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
