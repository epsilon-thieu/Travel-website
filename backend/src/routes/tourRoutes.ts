import express from 'express';
import tourController from '../controllers/tourController'

const router = express.Router();

router.get('/tour-amount', tourController.getTourAmount as any);
router.get('/', tourController.getTour);

export default router;