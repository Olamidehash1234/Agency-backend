import express from 'express';
import { validateProposal } from '../middleware/validation.js';
import { 
  submitProposal, 
  getProposals, 
  updateProposalStatus 
} from '../controllers/proposalController.js';

const router = express.Router();

router.post('/', validateProposal, submitProposal);
router.get('/', getProposals);
router.patch('/:id', updateProposalStatus);

export default router;