export interface UpdateMovieInputDTO {
    id: string;
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: string;
}

export interface UpdateMovieOutputDTO {
    id: string;
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: string;
}