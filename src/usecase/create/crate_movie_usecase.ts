import { Movies } from "@prisma/client";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import MovieRepositoryInterface from "../../infrastructure/movies/repository/movie_repository_intreface";
import { CreateMovieInputDTO, CreateMovieOutputDTO } from "./create_movie_dto";

export default class CreateMovieUsecase {
    private movieRepository: MovieRepositoryInterface;

    constructor(movieRepository: MovieRepositoryInterface) {
        this.movieRepository = movieRepository;
    }

    async execute(input: CreateMovieInputDTO): Promise<CreateMovieOutputDTO> {

        try {
            await this.validate(input);
        } catch (err: any) {
            throw new Error(err.errors)
        }

        const movie: Movies = {
            id: uuid(),
            year: input.year,
            title: input.title,
            studios: input.studios.join(','),
            producers: input.producers.join(','),
            winner: input.winner
        };

        const movieCreated = await this.movieRepository.create(movie);

        const output: CreateMovieOutputDTO = {
            id: movieCreated.id,
            year: movieCreated.year,
            title: movieCreated.title,
            studios: movieCreated.studios.split(','),
            producers: movieCreated.producers.split(','),
            winner: movieCreated.winner
        }

        return output
    }

    async validate(input: CreateMovieInputDTO): Promise<void> {
        const schema = Yup.object().shape({
            year: Yup.number().required(),
            title: Yup.string().required(),
            studios: Yup.array().of(Yup.string()).required(),
            producers: Yup.array().of(Yup.string()).required(),
            winner: Yup.string().required()
        });

        await schema.validate(input, { abortEarly: false });
    }

}