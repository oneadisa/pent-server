import {Router as expressRouter} from 'express';
import {
  deleteReviewAction, updateReviewProfile, addReview,
  getReviewDetails, getAllReviews, updateReviewRating,
  getRecentReviews, getBestReviews,
} from '../controllers';
import {onReviewCreation} from '../middlewares';


const router = expressRouter();

router.route('/all').get(getAllReviews);
router.get('/best', getBestReviews);
router.get('/recent', getRecentReviews);

router
    .route('/create')
    .post(onReviewCreation, addReview);

router.post('/one/rate/:reviewId', updateReviewRating);
router.get('/one/profile/:reviewId', getReviewDetails);
router.put('/one/update/:reviewId', updateReviewProfile);
router.delete('/one/delete/:reviewId', deleteReviewAction);

export default router;
