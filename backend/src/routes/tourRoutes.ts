import express from 'express';
import tourController from '../controllers/tourController'

const router = express.Router();

router.get('/tour-amount', tourController.getTourAmount as any);
router.get('/search', tourController.searchTour);
router.get('/featured', tourController.getFeaturedTours);
router.get('/trending', tourController.getTrendingTours);
router.get('/promotions', tourController.getPromotionTours);
router.get('/top-reviews', tourController.getTopReviews);
router.get('/:id', tourController.getTourById);
router.get('/', tourController.getTour);

export default router;
