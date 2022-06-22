import { MovieInfo } from "../movie/MovieInfo";

export interface ReviewResponseDto {
    writer: string;
    movieInfo: MovieInfo
    title: string;
    content: string;
};
