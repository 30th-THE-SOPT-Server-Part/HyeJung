import express, { Router } from 'express';

import user from './user';
import blog from './blog';
import like from './like';
import signup from './signup';

const router: Router = express.Router();

router.use('/user', user);
router.use('/blog', blog);
router.use('/like', like);
router.use('/signup', signup);

export default router;

// export default {
//     user, blog, like, signup
// }
