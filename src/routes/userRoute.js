import {Router as expressRouter} from 'express';
import {
  getAllUsers, updateProfile, userProfile,
  deleteUser,
} from '../controllers';


const router = expressRouter();

router
    .route('/all')
    .get(getAllUsers);

router.get('/one/profile/:userId', userProfile);
router.put('/one/update/:userId', updateProfile);
router.delete('/one/delete/:userId', deleteUser);
export default router;
