import { Request, Response } from 'express'
import DeleteMovieById from '../../../usecase/delete_by_id/delete_movi_by_id';

export class DeleteMovieByIdHandler {
    constructor(private readonly deleteById: DeleteMovieById) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            try {
                const movie = await this.deleteById.execute(id);
                return response.status(204).json(movie);
            } catch (e: any) {
                return response.status(404).json({ message: e.message });
            }
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }

}