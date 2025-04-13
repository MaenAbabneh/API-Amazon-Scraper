import dotenv from 'dotenv';
dotenv.config(); // load environment variables from .env file

export const config = {
apikey : process.env.API_KEY, // your amzone api key
apiUrl: `https://api.scraperapi.com`, // your amzone api url
port : process.env.PORT || 3000, // port for the server to listen on
}


