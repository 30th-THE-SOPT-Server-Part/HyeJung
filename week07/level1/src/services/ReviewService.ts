import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interface/review/ReviewCreateDto";
import { ReviewInfo } from "../interface/review/ReviewInfo";
import { ReviewOptionType } from "../interface/review/ReviewOptionType";
import { ReviewResponseDto } from "../interface/review/ReviewResponseDto";
import Review from "../models/Review";

const createReview = async (ReviewId: string, reviewCreateDto: ReviewCreateDto): Promise<PostBaseResponseDto> => {
    try {
        // const review = new Review(reviewCreateDto); // 안돼
        const review = new Review({
            title: reviewCreateDto.title,
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            Review: ReviewId
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

const getReviews = async (movieId: string, search: string, option: ReviewOptionType, page: number): Promise<ReviewResponseDto[]> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let reviews: ReviewInfo[] = [];
    const perPage: number = 2;

    try {
        const pattern = regex(search);

        //! 원래 코드
        // const reviews = await Review.find({ 
        //     Review: ReviewId
        // }).populate('writer', 'name').populate('Review');
        // console.log(reviews);

        // //데이터 가공
        // //map으로 배열을 돌면서 review객체를 Review라는 이름으로 가져옴
        // const data = await Promise.all(reviews.map(async (review: any) => {
        //     const result = {
        //         writer: review.writer.name,
        //         Review: review.Review, //Review는 전체 가져옴
        //         title: review.title,
        //         content: review.content
        //     };
            
        //     return result;
        // }));
        // console.log(data);
        
        // return data;

        if (option === 'title') {
            reviews = await Review.find({ title: { $regex: pattern }})
                                .where('movie').equals(movieId)
                                .sort({ createdAt: -1 })
                                .skip(perPage * (page - 1))
                                .limit(perPage);
        } else if (option === 'content') {
            reviews = await Review.find({ director: { $regex: pattern }})
                                .where('movie').equals(movieId)
                                .sort({ createdAt: -1 })
                                .skip(perPage * (page - 1) )
                                .limit(perPage);
        } else {
            reviews = await Review.find({
                $or: [
                    { title: { $regex: pattern } },
                    { director: { $regex: pattern } }
                ]
            })
            .where('movie').equals(movieId)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);
        }

        const total: number = await Review.countDocuments({ movie: movieId }); //movieId에 대한 개수
        const lastPage: number = Math.ceil(total / perPage);

        return { reviews, lastPage };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createReview,
    getReviews,
}