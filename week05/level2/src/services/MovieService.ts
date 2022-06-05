import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto";
import { MovieCreateDto } from "../interface/movie/MovieCreateDto";
import { MovieInfo, MovieCommentInfo } from "../interface/movie/MovieInfo";
import { MovieCommentCreateDto } from "../interface/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interface/movie/MovieCommentUpdateDto";
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
    updateMovieComment,
}