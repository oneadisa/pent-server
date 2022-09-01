import {Router as expressRouter} from 'express';
import {
  getUserProfile, userSignup,
  loginUser, logout,
} from '../controllers';
import {onUserSignup} from '../middlewares';

const router = expressRouter();

router.post('/user/signup', onUserSignup, userSignup);
router.get('/user/:userId/profile', getUserProfile);
router.post('/login', loginUser);
router.get('/logout', logout);
