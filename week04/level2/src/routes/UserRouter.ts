import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import { strings } from "../modules/responseMessage";
const router: Router = Router();

router.post('/', [
    body("email").notEmpty(),
    body("email").isEmail().withMessage(strings.NOT_EMAIL_FORMAT),
    body('name').notEmpty(),
    body('phone').notEmpty(),
], UserController.createUser); 
router.put('/:userId', UserController.updateUser);
router.get('/:userId',  UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router;