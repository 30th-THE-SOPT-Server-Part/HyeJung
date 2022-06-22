import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto"
import { MovieCreateDto } from "../interface/movie/MovieCreateDto"
import { MovieResponseDto } from "../interface/movie/MovieResponseDto"
import { MovieUpdateDto } from "../interface/movie/MovieUpdateDto"
import Movie from "../models/Movie"

const createMovie = async (movieCreateDto:MovieCreateDto): Promise<PostBaseResponseDto>  => {
    try {
        const movie = new Movie(movieCreateDto);
        await movie.save();
        const data = {
            _id: movie.id
        };
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const findByMovie = async (movieId:string): Promise<null | MovieResponseDto>  => {
    try {
        const movie = await Movie.findById(movieId);
        if(!movie){
            return null;
        }
        return movie;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const updateMovie = async (movieId:string, movieUpdateDto:MovieUpdateDto): Promise<MovieResponseDto | null>  => {
    try {
        const movie = await Movie.findByIdAndUpdate(movieId, movieUpdateDto);
        if(!movie){
            return null;
        }
        return movie;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const deleteMovie = async (movieId:string): Promise<MovieResponseDto | null>  => {
    try {
        const movie = await Movie.findByIdAndDelete(movieId);
        if(!movie){
            return null;
        }
        return movie;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default {
    createMovie,
    findByMovie,
    updateMovie,
    deleteMovie
}