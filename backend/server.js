// TypeScript requires types, install the necessary types for Express and Node if you haven't already:
// npm install --save @types/express @types/node nodemailer

// do not use this backend, we are using nextjs api instead

import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

// Initialize Express app
const app = express();
app.use(bodyParser.json());

interface Subscription {
  id: string;
  email: string;
  fnftId: string;
}

// In-memory storage for subscriptions
const subscriptions: Record<string, Subscription> = {};

// Mock FNFT data
const mockFNFTData: Record<string, { mature: boolean }> = {
  'fnft-1': { mature: false },
  'fnft-2': { mature: true },
};

app.post('/subscribe', (req, res) => {
  const { email, fnftId } = req.body;
  const subscriptionId = uuidv4();

  // Store the subscription
  subscriptions[subscriptionId] = { id: subscriptionId, email, fnftId };
  
  res.json({ subscriptionId });
});

app.get('/check-maturity', (req, res) => {
  // This endpoint would be called by a scheduled job or an internal service to check maturity
  Object.values(subscriptions).forEach(subscription => {
    const { email, fnftId } = subscription;
    const mature = mockFNFTData[fnftId]?.mature || false;
    if (mature) {
      sendNotification(email, fnftId);
    }
  });
  res.send('Checked maturity for all subscriptions');
});

// This would be your existing sendNotification function, modified to take parameters
async function sendNotification(email: string, fnftId: string) {
  // ... nodemailer setup and email sending logic
  console.log(`Sending notification to ${email} for FNFT ${fnftId}`);
  // Since we can't actually send emails without real credentials, log for now
}

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
