import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interface/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interface/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interface/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interface/movie/MovieInfo";
import { MovieOptionType } from "../interface/movie/MovieOptionType";
import Movie from "../models/Movie";

const createMovie = async (movieCreateDto: MovieCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const movie = new Movie(movieCreateDto); //안에 필드 검증을 마쳐서 이렇게 해도 ㄱㅊ
        await movie.save();

        const data = {
            _id: movie.id
        };

        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const createMovieComment = async (movieId: string, movieCommentCreateDto: MovieCommentCreateDto) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null; //영화 정보가 없으면 에러

        const newComments: MovieCommentInfo[] = [...movie.comments, movieCommentCreateDto]; //이전 값과 수정 값을 합쳐 배열 생성

        const updateMovie = await Movie.findOneAndUpdate(
            {_id: movieId}, 
            { comments: newComments },
            { new: true}); //업데이트 된 값을 updateMovie로 넣어
        if (!updateMovie) return null;

        return updateMovie;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getMovie = async (movieId: string) => {
    try {
        //reference 관계라서 populate 사용
        const movie = await Movie.findById(movieId).populate('comments.writer', 'name');
        if (!movie) return null;

        return movie;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getMoviesBySearch = async (search: string, option: MovieOptionType, page: number): Promise<MoviesResponseDto[]> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let movies: MovieInfo[] = [];
    const perPage: number = 2;

    try {
        const titleRegex = regex(search);

        if (option === 'title') {
            movies = await Movie.find({ title: { $regex: titleRegex }})
                                .sort({ createdAt: -1 }) //최신순 정렬
                                .skip(perPage * (page - 1)) //앞에서부터 몇개 건너뛸지
                                .limit(perPage);
        } else if (option === 'director') {
            movies = await Movie.find({ director: { $regex: titleRegex }})
                                .sort({ createdAt: -1 })
                                .skip(perPage * (page - 1) )
                                .limit(perPage);
        } else {
            movies = await Movie.find({
                $or: [
                    { title: { $regex: titleRegex } },
                    { director: { $regex: titleRegex } }
                ]
            })
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);
        }

        const total: number = await Movie.countDocuments({}); //모든 모큐먼트(row) 수
        const lastPage: number = Math.ceil(total / perPage);

        return { lastPage, movies };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const updateMovieComment = async (movieId: string, commentId: string, userId: string, movieCommentUpdateDto: MovieCommentUpdateDto): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const data = await Movie.findOneAndUpdate(
            { 
                _id: movieId, 
                comments: { $elemMatch: { _id: commentId, wrtier: userId }}
            },
            {
                $set: { //배열이라서 .과 $로 연결?
                    'comments.$.writer': userId,
                    'comments.$.comment': movieCommentUpdateDto.comment,
                }
            }, 
            { new: true }
        );
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default {
    createMovie,
    createMovieComment,
    getMovie,
    getMoviesBySearch,
    updateMovieComment,
}