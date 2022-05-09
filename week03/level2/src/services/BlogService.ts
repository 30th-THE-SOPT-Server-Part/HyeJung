import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto"
import { BlogCreateDto } from "../interface/blog/BlogCreateDto";
import { BlogResponseDto } from "../interface/blog/BlogResponseDto";
import { BlogUpdateDto } from "../interface/blog/BlogUpdateDto";
import Blog from "../models/Blog";

const createPost = async (blogCreateDto: BlogCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const post = new Blog(blogCreateDto);
        await post.save();

        const data = {
            _id: post.id
        };
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updatePost = async (postId: string, blogUpdateDto: BlogUpdateDto): Promise<void> => {
    try {
        await Blog.findByIdAndUpdate(postId, blogUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findPostById = async (postId: string): Promise<BlogResponseDto | null> => {
    try {
        const post = await Blog.findById(postId);
        
        if (!post) {
            return null;
        }
        
        return post;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deletePost = async (postId: string): Promise<void> => {
    try {
        await Blog.findByIdAndRemove(postId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createPost,
    updatePost,
    findPostById,
    deletePost,
};
