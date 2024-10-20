import { Request, Response } from "express";
import CreateMovieUsecase from "../../../usecase/create/crate_movie_usecase";
import { CreateMovieInputDTO } from "../../../usecase/create/create_movie_dto";

export class CreateMovieHandler {
    constructor(private readonly createMovieUseCase: CreateMovieUsecase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { year, title, producers, winner, studios } = request.body;
            const inputDTO: CreateMovieInputDTO = { year, title, producers, winner, studios };
            const movie = await this.createMovieUseCase.execute(inputDTO);
            return response.status(201).json(movie);
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }

}