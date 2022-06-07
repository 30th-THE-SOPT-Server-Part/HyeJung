import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";
// import { body } from "express-validator/check";
const router: Router = Router();

// routes -> use (/user) => post
router.post('/', [
    body("email").isEmail().notEmpty(),
    body('password').isLength({min: 6}).notEmpty(),
    body('name').notEmpty(),
    body('phone').notEmpty()
], UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

router.post('/signin', [
    body('email').isEmail().notEmpty(),
    body('password').isLength({min: 6}).notEmpty()
], UserController.signInUser);

export default router;