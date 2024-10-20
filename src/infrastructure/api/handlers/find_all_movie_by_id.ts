import { Request, Response } from 'express'
import FindById from '../../../usecase/get_by_id/get_movie_by_id_usecase';

export class FindMovieByIdHandler {
    constructor(private readonly findById: FindById) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            try {
                const movie = await this.findById.execute({ id });
                return response.status(200).json(movie);
            } catch (e: any) {
                return response.status(404).json({ message: e.message });
            }
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }

}