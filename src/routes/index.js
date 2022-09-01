import {Router as expressRouter} from 'express';

import authRoute from './authRoute';
import reviewsRoute from './reviewsRoute';
import userRoute from './userRoute';
import reviewMediaRoute from './reviewMediaRoute';

const router = expressRouter();

router.use('/auth', authRoute);
router.use('/reviews', reviewsRoute);
router.use('/user', userRoute);
router.use('/reviewMedia', reviewMediaRoute);

export default router;

// reviewTitle,
//       description,
//       landlord,
//       location,
//       amenities,
//       numberOfReviews,
//       ratings,
//       userId,
