import MovieRepository from "../../infrastructure/movies/repository/movie_reposittory";
import { UpdateMovieInputDTO, UpdateMovieOutputDTO } from "./updaet_movie_dto";
import * as Yup from 'yup';

export default class UpdateMovieUsecase {
    private movieRepository: MovieRepository;

    constructor(movieRepository: MovieRepository) {
        this.movieRepository = movieRepository;
    }

    async execute(input: UpdateMovieInputDTO): Promise<UpdateMovieOutputDTO> {

        const movieExists = await this.movieRepository.getById(input.id);

        if (!movieExists) {
            throw new Error(`Movie with id ${input.id} not found`);
        }

        movieExists.year = input.year;
        movieExists.title = input.title;
        movieExists.producers = input.producers;
        movieExists.winner = input.winner;
        movieExists.studios = input.studios;

        const movieUpdated = await this.movieRepository.update(input.id, movieExists);

        const output: UpdateMovieOutputDTO = {
            id: movieUpdated.id,
            year: movieUpdated.year,
            title: movieUpdated.title,
            producers: movieUpdated.producers,
            studios: movieUpdated.studios,
            winner: movieUpdated.winner
        }

        return output;
    }

    async validate(input: UpdateMovieInputDTO): Promise<void> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
            year: Yup.number().required(),
            title: Yup.string().required(),
            studios: Yup.array().of(Yup.string()).required(),
            producers: Yup.array().of(Yup.string()).required(),
            winner: Yup.string().required()
        });

        await schema.validate(input, { abortEarly: false });
    }
}