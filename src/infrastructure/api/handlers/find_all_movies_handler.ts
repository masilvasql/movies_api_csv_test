import { Request, Response } from 'express'
import FindAllUseCase from '../../../usecase/find_all/find_all_usecase';

export class FindAllMoviesHandler {
    constructor(private readonly findAllMoviesUsecase: FindAllUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const movies = await this.findAllMoviesUsecase.execute();
            return response.status(200).json(movies);
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }

}