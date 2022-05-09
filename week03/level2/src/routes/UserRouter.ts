import express, { Router } from "express";
import { UserController } from "../controllers";
const router: Router = express.Router();

router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router;
