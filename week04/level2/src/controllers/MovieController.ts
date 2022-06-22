import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interface/movie/MovieCreateDto";
import { MovieUpdateDto } from "../interface/movie/MovieUpdateDto";
import { message } from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { MovieService } from "../services";

/**
 * @route POST /movie
 * @desc Create Movie
 * @access Public
 */
 const createMovie = async (req: Request, res: Response): Promise<void | Response> => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    
    const movieCreateDto: MovieCreateDto = req.body;
    try {
        const data = await MovieService.createMovie(movieCreateDto);
        return res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)
        );
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
 };

/**
 * @route GET /movie/:movieId
 * @desc get Movie
 * @access Public
 */
 const getMovie = async (req: Request, res: Response): Promise<void | Response> => {
    const { movieId } = req.params;
    try {
        const data = await MovieService.findByMovie(movieId);
        if(!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
 };

 
 /**
 * @route PUT /movie:movieId
 * @desc PUT Movie
 * @access Public
 */
  const updateMovie = async (req: Request, res: Response): Promise<void | Response> => {
    const { movieId } = req.params;
    const movieUpdateDto: MovieUpdateDto = req.body;
    try {
        const movie = await MovieService.updateMovie(movieId, movieUpdateDto);
        if(!movie){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.NO_CONTENT).send();
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
 };

 /**
 * @route DELETE /movie/:movieId
 * @desc Delete Movie
 * @access Public
 */
  const deleteMovie = async (req: Request, res: Response): Promise<void | Response> => {
    const { movieId } = req.params;
    try {
        const movie = await MovieService.deleteMovie(movieId);
        if(!movie){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.NO_CONTENT).send();
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
 };

 export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}