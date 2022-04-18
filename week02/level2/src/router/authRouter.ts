import express, { Router } from 'express';
import signUp from '../api/auth';

const router: Router = express.Router();

router.get('/', signUp);

export default router;
