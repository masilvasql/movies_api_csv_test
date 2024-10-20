import { Router, Request, Response } from "express";
import CreateMovieUsecase from '../../../usecase/create/crate_movie_usecase';
import findAllMoviesUsecase from '../../../usecase/find_all/find_all_usecase';
import MovieRepository from '../../movies/repository/movie_reposittory';
import GetMovieByIdUsecase from '../../../usecase/get_by_id/get_movie_by_id_usecase';
import DeleteMovieByIdUsecase from '../../../usecase/delete_by_id/delete_movi_by_id';
import UpdateMovieUsecase from '../../../usecase/update/update_movie_usecase';

import { CreateMovieHandler } from '../handlers/create_movie_handler';
import { FindAllMoviesHandler } from '../handlers/find_all_movies_handler';
import { FindMovieByIdHandler } from '../handlers/find_all_movie_by_id'
import { DeleteMovieByIdHandler } from "../handlers/delete_movie_by_id";
import { UpdateMovieByIdHandler } from "../handlers/update_movie_by_id";
import GetProducerWithLongestIntervalAndTwoConsecutivesAwardsUsecase from "../../../usecase/get_producer_with_longest_interval_and_two_consecutives_awards/get_producer_with_longest_interval_and_two_consecutives_awards_usecase";
import { GetProducerWithLongestIntervalAndTwoConsecutivesAwardsHandler } from "../handlers/get_producer_with_longest_interval_and_two_consecutives_awards_handler";

const repository = new MovieRepository();

const createMovieUsecase = new CreateMovieUsecase(repository);
const createMovieHandler = new CreateMovieHandler(createMovieUsecase);

const findlMoviesUsecase = new findAllMoviesUsecase(repository);
const findAllMoviesHandler = new FindAllMoviesHandler(findlMoviesUsecase);

const findByIdUsecase = new GetMovieByIdUsecase(repository);
const findMovieByIdHandler = new FindMovieByIdHandler(findByIdUsecase);

const deleteMovieByIdUsecase = new DeleteMovieByIdUsecase(repository);
const deleteMovieByIdHandler = new DeleteMovieByIdHandler(deleteMovieByIdUsecase);

const updateMovieUsecase = new UpdateMovieUsecase(repository);
const updateMovieHandler = new UpdateMovieByIdHandler(updateMovieUsecase);

const awardsIntervalUsecase = new GetProducerWithLongestIntervalAndTwoConsecutivesAwardsUsecase(repository);
const awardsIntervalHandler = new GetProducerWithLongestIntervalAndTwoConsecutivesAwardsHandler(awardsIntervalUsecase);

export const moviesRouter = Router();



moviesRouter.post("/", async (request: Request, response: Response) => {
    await createMovieHandler.handle(request, response);
})

moviesRouter.get("/", async (request: Request, response: Response) => {
    await findAllMoviesHandler.handle(request, response);
})

moviesRouter.get("/:id", async (request: Request, response: Response) => {
    await findMovieByIdHandler.handle(request, response);
})

moviesRouter.delete("/:id", async (request: Request, response: Response) => {
    await deleteMovieByIdHandler.handle(request, response);
})

moviesRouter.put("/:id", async (request: Request, response: Response) => {
    await updateMovieHandler.handle(request, response);
})

moviesRouter.get("/awards/interval", async (request: Request, response: Response) => {
    await awardsIntervalHandler.handle(request, response);
})