import { Request, Response } from "express";
import { ReviewCreateDto } from "../interface/review/ReviewCreateDto";
import { ReviewOptionType } from "../interface/review/ReviewOptionType";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { ReviewService } from "../services";
const { validationResult } = require('express-validator');

/**
 *  @route POST /review/movies/:movieId
 *  @desc Create Review
 *  @access Public
 */
const createReview = async (req: Request, res: Response) => {
    //validator 검증 후 에러가 발생하면 여기 error에 담김
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    const reviewCreateDto: ReviewCreateDto = req.body;
    const { movieId } = req.params;

    try {
        const data = await ReviewService.createReview(movieId, reviewCreateDto);
        if (!data) {
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.READ_REVIEW_SUCCESS, data));
    } catch(error){
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
  }
}

/**
*  @route GET /review/movies/:movieId
*  @desc Get Review
*  @access Public
*/
const getReviews = async (req: Request, res: Response) => {
   const { movieId } = req.params;

   const { search, option } = req.query;

   const isOptionType = (option: string): option is ReviewOptionType => {
    return ["title", "content", "title_content"].indexOf(option) !== -1; 
    }

    if (!isOptionType(option as string)) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST)
        );
    }

    const page: number = Number(req.query.page || 1);

   try {
       const data = await ReviewService.getReviews(movieId, search as string, option as ReviewOptionType, page );

       res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_REVIEW_SUCCESS, data));
   } catch (error) {
       console.log(error);
       res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
   } 
}

export default {
    createReview,
    getReviews,
}