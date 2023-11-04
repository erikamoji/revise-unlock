import Web3 from 'web3';
import nodemailer from 'nodemailer';

// Step 1: Instantiate web3 instance connected to a provider
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"));

// Step 2: Create contract instance
const lockManagerABI = [/* ...provided ABIs... */];
const lockManagerAddress = "0x226124E83868812D3Dae87eB3C5F28047E1070B7";
const lockManagerContract = new web3.eth.Contract(lockManagerABI, lockManagerAddress);

const fnftId = /* ...the FNFT ID you are interested in... */;

// Function to send email notification
async function sendNotification() {
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

// Function to start polling the contract
function startPolling() {
    const intervalId = setInterval(async () => {
        try {
            const mature = await lockManagerContract.methods.getLockMaturity(fnftId).call();
            if (mature) {
                // If mature, send notification and clear interval
                sendNotification();
                clearInterval(intervalId);
            }
        } catch (error) {
            console.error('Error checking lock maturity:', error);
        }
    }, 60000);  // Poll every 60 seconds

    return intervalId;  // Return interval ID to allow for clearing later if needed
}

// Start polling when file is run
startPolling();