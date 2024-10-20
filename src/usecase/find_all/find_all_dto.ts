export default interface FindAllOutputDTO {
    movies: Movies[];
}

interface Movies {
    id: string;
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: string;
}