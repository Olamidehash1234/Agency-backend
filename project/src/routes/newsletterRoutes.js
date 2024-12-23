import express from 'express';
import { validateNewsletter } from '../middleware/validation.js';
import { subscribe, getSubscribers } from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/subscribe', validateNewsletter, subscribe);
router.get('/subscribers', getSubscribers);

export default router;