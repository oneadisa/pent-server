import {Router as expressRouter} from 'express';
import {
  deleteReviewAction, updateReviewProfile, addReview,
  getReviewDetails, getAllReviews,
} from '../controllers';
import {onReviewCreation} from '../middlewares';


const router = expressRouter();

router.route('/all').get(getAllReviews);

router
    .route('/create')
    .post(onReviewCreation, addReview);

router.get('/one/profile/:reviewId', getReviewDetails);
router.put('/one/update/:reviewId', updateReviewProfile);
router.delete('/one/delete/:reviewId', deleteReviewAction);

export default router;
