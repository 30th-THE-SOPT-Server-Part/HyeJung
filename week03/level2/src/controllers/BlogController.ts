import { Request, Response } from "express";
import { BlogCreateDto } from "../interface/blog/BlogCreateDto";
import { BlogUpdateDto } from "../interface/blog/BlogUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { BlogService } from "../services";

/**
 * @route POST /blog
 * @desc Create Blog
 * @access Public
 */
const createPost = async (req: Request, res: Response): Promise<void | Response> => {
    const blogCreateDto: BlogCreateDto = req.body;
    if(!blogCreateDto){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    try {
        const data = await BlogService.createPost(blogCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_POSTING_SUCCESS, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route PUT /blog/:postId
 * @desc update Blog
 * @access Public
 */
const updatePost = async (req: Request, res: Response): Promise<void | Response> => {
    const { postId } = req.params;
    let blogUpdateDto: BlogUpdateDto = req.body;
    blogUpdateDto.updateAt = new Date();
    try {
        await BlogService.updatePost(postId, blogUpdateDto);
        res.status(statusCode.NO_CONTENT).send();
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route GET /blog/:postId
 * @desc Read Blog
 * @access Public
 */
const findPostById = async (req: Request, res: Response): Promise<void | Response> => {
    const { postId } = req.params;
    try {
        const data = await BlogService.findPostById(postId);
        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_POSTING_SUCCESS, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

/**
 * @route DELETE /blog/:postId
 * @desc Delete Blog
 * @access Public
 */
const deletePost = async (req: Request, res: Response): Promise<void | Response> => {
    const { postId } = req.params;
    
    try {
        await BlogService.deletePost(postId);
        res.status(statusCode.NO_CONTENT).send();
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
};

export default {
    createPost,
    updatePost,
    findPostById,
    deletePost,
};
