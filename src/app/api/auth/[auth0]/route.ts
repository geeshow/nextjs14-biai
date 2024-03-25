// app/api/auth/[auth0]/route.js
import {handleAuth, handleCallback, handleLogin} from '@auth0/nextjs-auth0';
import {Request} from "next/dist/compiled/@edge-runtime/primitives";
import {NextApiRequest, NextApiResponse} from "next";

export const GET = handleAuth();

export default handleAuth({
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleLogin(req, res, {
        // Get the connection name from the Auth0 Dashboard
        authorizationParams: { connection: 'github' }
      });
    } catch (error) {
      console.error(error);
    }
  },
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      console.log('req', req);
      
      await handleCallback(req, res, {
        redirectUri: '/chat'
      });
    } catch (error) {
      console.error(error);
    }
  }
});
