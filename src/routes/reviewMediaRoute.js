import {Router as expressRouter} from 'express';
import {
  deleteReviewMediaAction, updateReviewMediaProfile, addReviewMedia,
  getMyReviewMediaDetails, getReviewMediaDetails, getAllReviewMedias,
  getReviewMediasProduct, getReviewMediaDetailsUser,
} from '../controllers';
import {onReviewMediaCreation} from '../middlewares';


const router = expressRouter();

router.route('/all').get(getAllReviewMedias);

router
    .route('/create')
    .post(onReviewMediaCreation, addReviewMedia);

router.get('/me', getMyReviewMediaDetails);
router.get('/me/profile/:userId', getReviewMediaDetailsUser);

router.get('/one/image/:reviewImageId', getReviewMediaDetails);
router.put('/one/update/:reviewImageId', updateReviewMediaProfile);
router.delete('/one/delete/:reviewImageId',
    deleteReviewMediaAction);

router.get('/one/review/:reviewId', getReviewMediasProduct);

export default router;
