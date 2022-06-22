import { MovieCommentInfo } from "./MovieInfo";

export interface MovieResponseDto {
    title: string;
    director: string;
    startDate?: string;
    thumbnail?: string;
    story?: string;
    comments?: MovieCommentInfo[];
}