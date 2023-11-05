// import dotenv from 'dotenv';
// import Web3 from 'web3';
import nodemailer from 'nodemailer';

// Comment out code that would be used in a real-world deployment (this is currently using mock info)

// import { LockManagerABI } from './LockManagerABI';
// dotenv.config(); // Load environment variables from .env.local file
// const infuraProjectId = process.env.INFURA_PROJECT_ID; // Now you can use process.env to access your environment variables
// const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${infuraProjectId}`)); // Step 1: Instantiate web3 instance connected to a provider
// Step 2: Create contract instance (this would be used in the actual deployment)
// const lockManagerAddress = "0x226124E83868812D3Dae87eB3C5F28047E1070B7";
// const lockManagerContract = new web3.eth.Contract(LockManagerABI, lockManagerAddress); 

// This code snippet uses a mockFNFTData object to simulate the maturity status of FNFTs.

// Mock FNFT data
const mockFNFTData = {
    'fnft-1': { mature: false },
    'fnft-2': { mature: true },
    // ... more mock data as needed
};

// The getMockLockMaturity function pretends to call a smart contract and returns the maturity status of an FNFT based on the mock data.
async function getMockLockMaturity(fnftId) {
    // Simulate a delay to mimic async behavior of blockchain calls
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockFNFTData[fnftId]?.mature || false;
}

// Function to send email notification
async function sendNotification(fnftId) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: '"FNFT Unlock Notification" <your-email@gmail.com>',
        to: 'user-email@example.com',
        subject: 'Your FNFT has Unlocked',
        text: `Your FNFT with ID ${fnftId} has unlocked!`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// The startPollingWithMock function uses this mock function instead of the actual smart contract call.
function startPollingWithMock() {
    const intervalId = setInterval(async () => {
        try {
            // Use mock function instead of smart contract call
            const fnftId = 'fnft-1';  // Replace with dynamic ID as needed
            const mature = await getMockLockMaturity(fnftId);
            if (mature) {
                // If mature, send notification and clear interval
                console.log(`FNFT ${fnftId} has matured!`);
                await sendNotification(fnftId);
                clearInterval(intervalId);
            }
        } catch (error) {
            console.error('Error checking lock maturity:', error);
        }
    }, 60000);  // Poll every 60 seconds

    return intervalId;  // Return interval ID to allow for clearing later if needed
}

// Start polling with mock data when file is run
startPollingWithMock();
