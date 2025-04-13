import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is up and running 🚀' });
});

export default router;