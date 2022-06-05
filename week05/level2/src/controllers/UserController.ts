import express, { Request, Response } from "express";
import { UserCreateDto } from "../interface/user/UserCreateDto";
import { UserUpdateDto } from "../interface/user/UserUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { UserService } from "../services";
import { validationResult } from "express-validator";
import getToken from "../modules/jwtHandler";
import { UserSignInDto } from "../interface/user/UserSignInDto";
import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto";

/**
 * @route POST /user
 * @desc Create User
 * @access Public
 */
const createUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
      return res.status(statusCode.BAD_REQUEST).send(
          util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST)
      );
  }

  const userCreateDto: UserCreateDto = req.body; // User Create Dto로 req.body 받아오기
  try {
      const result = await UserService.createUser(userCreateDto);
      if (!result) {
          return res.status(statusCode.CONFLICT).send(
              util.fail(statusCode.CONFLICT, message.DUPLICATED)
          );
      }

      const accessToken = getToken(result._id);
      
      const data = {
          _id: result._id,
          accessToken
      };

      res.status(statusCode.CREATED).send(
          util.success(
              statusCode.CREATED,
              message.CREATE_USER_SUCCESS,
              data
          )
      );
  } catch (err) {
    console.log(err);
    //서버 내부에서 오류 발생
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
  }
};
/**
 * @route POST /signin
 * @desc Signin User
 * @access Public
 */
const signInUser = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST)
        );
    }
    const userSignInDto: UserSignInDto = req.body;

    try {
        const result = await UserService.signInUser(userSignInDto);

        if (!result) {
            return res.status(statusCode.NOT_FOUND).send(
                util.fail(statusCode.NOT_FOUND, message.NOT_FOUND)
            );
        } else if (result === 401) {
            return res.status(statusCode.UNAUTHORIZED).send(
                util.fail(statusCode.UNAUTHORIZED, message.INVALID_PASSWORD)
            );
        }

        const accessToken = getToken((result as PostBaseResponseDto)._id);

        const data = {
            _id: (result as PostBaseResponseDto)._id,
            accessToken
        }
        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.SIGNIN_USER_SUCCESS, data)
        );
    } catch (err) {
        console.log(err);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));     
    }
}

/**
 * @route PUT /user/:userId
 * @desc Update User
 * @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    const userUpdateDto: UserUpdateDto = req.body;
    const { userId } = req.params;

    try {
        await UserService.updateUser(userId, userUpdateDto);

        //update, delete 성공 시 -> 204 Return send()까지 붙여주기!
        res.status(statusCode.NO_CONTENT).send();
    } catch (err) {
        console.log(err);
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

        if (!data){
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
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }

};

export default {
  createUser,
  signInUser,
  updateUser,
  findUserById,
  deleteUser
};
