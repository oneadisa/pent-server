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

router.get('/one/image/:productImageId', getReviewMediaDetails);
router.put('/one/update/:productImageId', updateReviewMediaProfile);
router.delete('/one/delete/:productImageId',
    deleteReviewMediaAction);

router.get('/admin/image/:productImageId', getReviewMediaDetails);
router.put('/admin/update/:productImageId', updateReviewMediaProfile);
router.delete('/admin/delete/:productImageId',
    deleteReviewMediaAction);

router.get('/one/product/:productId', getReviewMediasProduct);

export default router;
