export const allowedOrigins = [
  'https://agen-cy.vercel.app',  // Production frontend
  'http://localhost:5173',       // Development frontend
];

export const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};