import MovieRepositoryInterface from "../../infrastructure/movies/repository/movie_repository_intreface";

export default class DeleteMovieByIdUsecase {
    private movieRepository: MovieRepositoryInterface;

    constructor(movieRepository: MovieRepositoryInterface) {
        this.movieRepository = movieRepository;
    }

    async execute(id: string): Promise<void> {
        try {

            if (!id) {
                throw new Error('Id is required');
            }


            const isMovieFound = await this.movieRepository.getById(id);
            if (!isMovieFound) {
                throw new Error(`Movie with id ${id} not found`);
            }
            await this.movieRepository.delete(id);
        } catch (error: Error | any) {
            throw new Error(error.message);
        }
    }
}