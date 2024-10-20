import MovieRepository from "../../infrastructure/movies/repository/movie_reposittory";
import { GetMovieByIdInputDTO, GetMovieByIdOutputDTO } from "./get_movie_by_id_dto";


export default class GetMovieByIdUsecase {
    private movieRepository: MovieRepository;

    constructor(movieRepository: MovieRepository) {
        this.movieRepository = movieRepository;
    }

    async execute(input: GetMovieByIdInputDTO): Promise<GetMovieByIdOutputDTO> {
        const movie = await this.movieRepository.getById(input.id);
        if (!movie) {
            throw new Error('Movie not found');
        }

        const output: GetMovieByIdOutputDTO = {
            id: movie.id,
            year: movie.year,
            title: movie.title,
            studios: movie.studios,
            producers: movie.producers,
            winner: movie.winner
        }

        return output;
    }
}