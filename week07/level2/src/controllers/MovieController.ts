import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { MovieCommentCreateDto } from "../interface/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interface/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interface/movie/MovieCreateDto";
import { MovieOptionType } from "../interface/movie/MovieOptionType";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import MovieService from "../services/MovieService";

/**
 * @route POST /movie
 * @desc Create Movie
 * @access Public
 */
 const createMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST)
        );
    }
    
    const movieCreateDto: MovieCreateDto = req.body;
    try {
        const data = await MovieService.createMovie(movieCreateDto);
        return res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data)
        );
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route POST /movie
 * @desc Create Movie
 * @access Public
 */
const createMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST)
        );
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;
    try {
        const data = await MovieService.createMovieComment(movieId, movieCommentCreateDto);
        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(
                util.fail(statusCode.NOT_FOUND, message.NOT_FOUND)
            );
        }
        res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_MOVIE_COMMENT_SUCCESS, data)
        );
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /movie
 * @desc READ Movie
 * @access Public
 */
const getMovie =async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await MovieService.getMovie(movieId);
        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(
                util.fail(statusCode.NOT_FOUND, message.NOT_FOUND)
            );
        }
        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data)
        );
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /movie?search=
 * @desc READ search movie
 * @access Public
 */
const getMoviesBySearch = async (req: Request, res: Response) => {
    const { search, option } = req.query;

    const isOptionType = (option: string): option is MovieOptionType => {
        return ["title", "director", "title_director"].indexOf(option) !== -1; 
    }

    if (!isOptionType(option as string)) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST)
        );
    }

    const page: number = Number(req.query.page || 1);

    try {
        const data = await MovieService.getMoviesBySearch(search as string, option as MovieOptionType, page);
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route PUT /movie/:movieId/comments/:commentId
 * @desc Update Movie
 * @access Private
 */
const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(
            util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST)
        );
    }
    const movieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;
    const userId = req.body.user.id;
    try {
        const data = await MovieService.updateMovieComment(movieId, commentId, userId, movieCommentUpdateDto);
        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(
                util.fail(statusCode.NOT_FOUND, message.NOT_FOUND)
            );
        }
        res.status(statusCode.NO_CONTENT).send();
    } catch (err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
}
export default {
    createMovie,
    createMovieComment,
    getMovie,
    getMoviesBySearch,
    updateMovieComment,
}