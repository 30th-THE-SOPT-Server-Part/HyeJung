import { Request, Response } from "express";
import { UserCreateDto } from "../interface/user/UserCreateDto";
import { UserUpdateDto } from "../interface/user/UserUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services/UserService";

/**
 * @route POST /user
 * @desc Create User
 * @access Public
 */
const createUser = async (req: Request, res: Response) => {
    const userCreateDto: UserCreateDto = req.body;

    try {
        //이미 존재하는 유저인지 확인
        const isExist = await UserService.existUser(userCreateDto.email);
        if (isExist) {
            return res.status(statusCode.BAD_REQUEST).send(
                util.fail(statusCode.BAD_REQUEST, message.IS_EXIST_USER)
            );
        }

        const data = await UserService.createUser(userCreateDto);
        return res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)
        );
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route PUT /user/:userId
 * @desc Update User
 * @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userUpdateDto: UserUpdateDto = req.body;

    try {
        await UserService.updateUser(userId, userUpdateDto);
        res.status(statusCode.NO_CONTENT).send();
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route GET /user/:userId
 * @desc Read User
 * @access Public
 */
 const findUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await UserService.findUserById(userId);

        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route Delete /user/:userId
 * @desc Delete User
 * @access Public
 */
const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    
    try {
        await UserService.deleteUser(userId);
        res.status(statusCode.NO_CONTENT).send();
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
};
