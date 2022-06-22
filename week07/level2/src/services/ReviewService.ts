import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interface/review/ReviewCreateDto";
import { ReviewInfo } from "../interface/review/ReviewInfo";
import { ReviewOptionType } from "../interface/review/ReviewOptionType";
import { ReviewsResponseDto } from "../interface/review/ReviewsResponseDto";
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

const getReviews = async (movieId: string,  page: number, search?: string, option?: ReviewOptionType): Promise<ReviewsResponseDto> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let reviews: ReviewInfo[] = [];
    const perPage: number = 2;

    try {
        if (search && option) {
            const pattern = regex(search);
            
            switch (option) {
                case 'title': 
                    reviews = await Review.find({ title: { $regex: pattern }})
                                        .where('movie').equals(movieId)
                                        .sort({ createdAt: -1 })
                                        .skip(perPage * (page - 1))
                                        .limit(perPage);
                    break;
                case 'content':
                    reviews = await Review.find({ director: { $regex: pattern }})
                                        .where('movie').equals(movieId)
                                        .sort({ createdAt: -1 })
                                        .skip(perPage * (page - 1) )
                                        .limit(perPage);
                    break;
                default:
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
        } else {
            reviews = await Review.find()
                                .where('movie').equals(movieId)
                                .sort({ createdAt: -1 })
                                .skip(perPage * (page - 1))
                                .limit(perPage);
        }

        const total: number = await Review.countDocuments({ movie: movieId }); //movieId에 대한 개수
        const lastPage: number = Math.ceil(total / perPage);

        return { lastPage, reviews };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createReview,
    getReviews,
}