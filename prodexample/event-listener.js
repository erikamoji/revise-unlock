// a separate Node.js service (not within the Next.js app) that listens to the blockchain events

import dotenv from 'dotenv';
import Web3 from 'web3';
import { LockManagerABI } from './LockManagerABI';

dotenv.config(); // Load environment variables from .env.local file

const infuraProjectId = process.env.INFURA_PROJECT_ID; // Now you can use process.env to access your environment variables

// Step 1: Instantiate web3 instance connected to a provider
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${infuraProjectId}`)); 

// Step 2: Create contract instance (this would be used in the actual deployment)
const lockManagerAddress = "0x226124E83868812D3Dae87eB3C5F28047E1070B7";
const lockManagerContract = new web3.eth.Contract(LockManagerABI, lockManagerAddress); 


/lockManagerContract.events.LockCreated({
    fromBlock: 'latest'
  })
  .on('data', async function(event) {
    const lockId = event.returnValues.lockId;
    // Fetch lock details
    const lock = await lockManagerContract.methods.getLock(lockId).call();
    // Check if the lock is mature
    const isMature = await lockManagerContract.methods.getLockMaturity(lockId).call();
    
    // If mature, process for notification
    if (isMature) {
      // Fetch additional lock information for the notification
      const description = await lockManagerContract.methods.lockDescription(lockId).call();
      // Call the Next.js API route to send notification
      await axios.post('https://localhost:3000/api/notify', { description });
    }
  })
  .on('error', console.error);
