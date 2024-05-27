import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  origin: '*', // Allow all origins, you can restrict this in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const corsMiddleware = async (req, res) => {
  await runMiddleware(req, res, cors);
};