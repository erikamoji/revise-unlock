import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mg from 'nodemailer-mailgun-transport';

// Load environment variables from .env file
dotenv.config();

// Mailgun auth object
const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY, // Replace with your Mailgun API key
    domain: process.env.MAILGUN_DOMAIN // Replace with your Mailgun domain
  }
};

// Create a Nodemailer transporter using Mailgun transport
const transporter = nodemailer.createTransport(mg(mailgunAuth));

// This would be replaced by your database in a real application
const subscriptions: Record<string, { email: string; fnftId: string; }> = {};

// Mock FNFT data
const mockFNFTData = {
    'fnft-1': { mature: false },
    'fnft-2': { mature: true },
    // ... more mock data as needed
};

// Mock function to simulate getting lock maturity from a smart contract
export async function getMockLockMaturity(fnftId: string): Promise<boolean> {
    // Simulate a delay to mimic async behavior of blockchain calls
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockFNFTData[fnftId]?.mature || false;
}

// Function to send email notification
export async function sendNotification(email, fnftId) {
  const mailOptions = {
    from: 'postmaster@sandboxee5c8127d92e41de9424e509d854da4e.mailgun.org', // Verified Mailgun email
    to: email, // Recipient's email
    subject: `Your FNFT ${fnftId} has Unlocked`, // Subject line
    text: `Your FNFT with ID ${fnftId} has unlocked!`, // Plain text body
    // html: '<b>Your FNFT has unlocked!</b>' // HTML body (optional)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Iterate over all subscriptions and check if the FNFTs have matured
    for (const subscription of Object.values(subscriptions)) {
      const { email, fnftId } = subscription;
      const mature = await getMockLockMaturity(fnftId);
      if (mature) {
        await sendNotification(email, fnftId);
      }
    }
    res.status(200).send('Checked maturity for all subscriptions');
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
