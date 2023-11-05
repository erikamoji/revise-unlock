import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// This would be replaced by your database in a real application
const subscriptions: Record<string, { email: string; fnftId: string; }> = {};

// Mock FNFT data
const mockFNFTData = {
    'fnft-1': { mature: false },
    'fnft-2': { mature: true },
    // ... more mock data as needed
};

// Load environment variables from .env.local file
dotenv.config();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER, // replace with your Mailtrap username from .env.local
        pass: process.env.MAILTRAP_PASS  // replace with your Mailtrap password from .env.local
    }
});

// Mock function to simulate getting lock maturity from a smart contract
async function getMockLockMaturity(fnftId: string): Promise<boolean> {
    // Simulate a delay to mimic async behavior of blockchain calls
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockFNFTData[fnftId]?.mature || false;
}

// Function to send email notification
async function sendNotification(email, fnftId) {
    const mailOptions = {
        from: '"FNFT Unlock Notification" <from@example.com>', // sender address
        to: email, // list of receivers
        subject: `Your FNFT ${fnftId} has Unlocked`, // Subject line
        text: `Your FNFT with ID ${fnftId} has unlocked!`, // plain text body
        // html: '<b>Your FNFT has unlocked!</b>' // html body
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
