import MovieRepositoryInterface from "../../infrastructure/movies/repository/movie_repository_intreface";
import FindAllOutputDTO from "./find_all_dto";

export default class FindAllUseCase {
    private movieRepository: MovieRepositoryInterface;

    constructor(movieRepository: MovieRepositoryInterface) {
        this.movieRepository = movieRepository;
    }

    async execute(): Promise<FindAllOutputDTO> {
        const moviees = await this.movieRepository.getAll();

        const output: FindAllOutputDTO = {
            movies: moviees
        }

        return output;
    }
}