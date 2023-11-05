# Revest Alrt: FNFT Unlock Notifications Service

This service is designed to notify users via email when their Financial NFTs (FNFTs) unlock. It utilizes Next.js for both the frontend interface and backend API routes, complemented by a separate Node.js script for listening to smart contract events on the Ethereum blockchain.

## Overview of Components

- `subscribe.ts`: An API route that allows users to subscribe to notifications for specific FNFTs by providing their email and the FNFT ID.
- `check-maturity.ts`: Contains logic to check the maturity of FNFTs against mock data and send email notifications using Mailgun.
- `index.tsx`: The main page of the Next.js app where users can enter their email and FNFT ID to subscribe to notifications.
- `notify.ts`: An API route that will be called by the separate Node.js event listener to trigger email notifications for matured FNFTs.
- Mailgun: An email delivery service used to send out notifications. This service integrates with the Mailgun API to dispatch emails.

## Local Development Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure your environment variables in a `.env.local` file at the project's root:
   ```
   MAILGUN_API_KEY=your-mailgun-api-key
   MAILGUN_DOMAIN=your-mailgun-domain
   ```
4. Start the development server using `npm run dev`.

## API Routes

### `subscribe.ts`

Allows users to subscribe to unlock notifications for their FNFTs. It stores the subscription in an in-memory object which should be replaced by a persistent database in production.

### `check-maturity.ts`

This file contains two key functions:
- `getMockLockMaturity`: Simulates checking the maturity of an FNFT.
- `sendNotification`: Sends an email notification using Mailgun when an FNFT has matured.

### `index.tsx`

The main frontend component where users input their details to subscribe to notifications. It interacts with the `subscribe.ts` API route.

## Production Implementation

### `notify.ts`

This API route will be called by a separate Node.js event listener script when a `LockCreated` event is detected on the Ethereum blockchain.

**To implement in production:**
- Implement authentication and input validation to secure the route.
- Replace the mock data with actual data from the blockchain.

### Separate Node.js Event Listener

This will be a Node.js script separate from the Next.js application, responsible for listening to smart contract events.

**To implement in production:**
1. Create the `event-listener.js` script using Web3.js.
2. Use `axios` to call the `notify.ts` API route upon detecting an FNFT unlock event.
3. Incorporate robust error handling and reconnection logic.
4. Use a process manager like PM2 for deployment to ensure the script runs continuously.

## Deployment Considerations

Ensure the following when deploying to production:
- Your Next.js app is properly configured on your server or hosting platform.
- Environment variables are securely set up on the server.
- The separate Node.js event listener is deployed to a reliable service capable of running Node.js scripts indefinitely.
- Constant monitoring is in place for the event listener to ensure uptime.

## Security Notes

- Always validate and sanitize user input to mitigate security risks.
- Employ HTTPS for all API endpoints to secure data in transit.
- Implement rate limiting to protect against denial-of-service attacks.