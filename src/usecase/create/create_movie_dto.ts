export interface CreateMovieInputDTO {
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: string;
}

export interface CreateMovieOutputDTO {
    id: string;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: string;
}