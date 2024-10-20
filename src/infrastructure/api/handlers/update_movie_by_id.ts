import { Request, Response } from 'express'
import UpdateMovieUsecase from '../../../usecase/update/update_movie_usecase';
import { UpdateMovieInputDTO } from '../../../usecase/update/updaet_movie_dto';

export class UpdateMovieByIdHandler {
    constructor(private readonly updateMovieById: UpdateMovieUsecase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { year, title, producers, studios, winner } = request.body;
            try {
                const input: UpdateMovieInputDTO = {
                    id: id,
                    year: year,
                    title: title,
                    producers: producers.join(", "),
                    studios: studios.join(", "),
                    winner: winner
                }

                const output = await this.updateMovieById.execute(input);
                return response.status(200).json(output);
            } catch (e: any) {
                return response.status(404).json({ message: e.message });
            }
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }

}