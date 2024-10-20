import { Request, Response } from "express";

import GetProducerWithLongestIntervalAndTwoConsecutivesAwardsUsecase from "../../../usecase/get_producer_with_longest_interval_and_two_consecutives_awards/get_producer_with_longest_interval_and_two_consecutives_awards_usecase";

export class GetProducerWithLongestIntervalAndTwoConsecutivesAwardsHandler {
    constructor(private readonly getProducerWithLongestIntervalAndTwoConsecutivesAwardsUseCase: GetProducerWithLongestIntervalAndTwoConsecutivesAwardsUsecase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.getProducerWithLongestIntervalAndTwoConsecutivesAwardsUseCase.execute();
            return response.status(200).json(result);
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }

}