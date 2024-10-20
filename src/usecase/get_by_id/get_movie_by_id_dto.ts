export interface GetMovieByIdInputDTO {
    id: string;
}

export interface GetMovieByIdOutputDTO {
    id: string;
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: string;
}