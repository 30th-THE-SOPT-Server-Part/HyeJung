import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interface/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interface/review/ReviewResponseDto";
import Review from "../models/Review";

const createReview = async (movieId: string, reviewCreateDto: ReviewCreateDto): Promise<PostBaseResponseDto> => {
    try {
        // const review = new Review(reviewCreateDto); // 안돼
        const review = new Review({
            title: reviewCreateDto.title,
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            movie: movieId
        });
        await review.save();

        const data = {
            _id : review._id
        };
        
        return data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const getReviews = async (movieId: string) => {//: Promise<ReviewResponseDto[]> => {
    try {
        const reviews = await Review.find({ 
            movie: movieId
        }).populate('writer', 'name').populate('movie');
        console.log(reviews);

        //데이터 가공
        //map으로 배열을 돌면서 review객체를 Review라는 이름으로 가져옴
        const data = await Promise.all(reviews.map(async (review: any) => {
            const result = {
                writer: review.writer.name,
                movie: review.movie, //movie는 전체 가져옴
                title: review.title,
                content: review.content
            };
            
            return result;
        }));
        console.log(data);
        
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createReview,
    getReviews,
}