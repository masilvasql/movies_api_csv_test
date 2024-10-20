import { Movies } from "@prisma/client";
import MovieRepositoryInterface from "../../infrastructure/movies/repository/movie_repository_intreface";
import { GetProducerWithLongestIntervalAndTwoConsecutivesAwardsOutputDto } from "./get_producer_with_longest_interval_and_two_consecutives_awards_dto";

export default class GetProducerWithLongestIntervalAndTwoConsecutivesAwardsUsecase {
    private movieRepository: MovieRepositoryInterface;

    constructor(movieRepository: MovieRepositoryInterface) {
        this.movieRepository = movieRepository;
    }

    async execute(): Promise<GetProducerWithLongestIntervalAndTwoConsecutivesAwardsOutputDto> {
        const movies = await this.movieRepository.getWinners();
        const awardsByYear = this.grouProducerAwardsByYear(movies);
        return this.getIntervals(awardsByYear);
    }

    private grouProducerAwardsByYear(movies: Movies[]): { [key: string]: number[] } {
        const awards: { [key: string]: number[] } = {};
        movies.forEach((movie) => {
            const producers = movie.producers.split(',').map((producer) => producer.trim());
            producers.forEach((producer) => {
                if (!awards[producer]) {
                    awards[producer] = [];
                }
                awards[producer].push(movie.year);
            });
        });
        return awards;
    }

    private getIntervals(awards: { [key: string]: number[] }): GetProducerWithLongestIntervalAndTwoConsecutivesAwardsOutputDto {
        const retorno: GetProducerWithLongestIntervalAndTwoConsecutivesAwardsOutputDto = {
            max: [],
            min: []
        };

        let maxIntervals: { producer: string; interval: number; previousWin: number; followingWin: number }[] = [];
        let minIntervals: { producer: string; interval: number; previousWin: number; followingWin: number }[] = [];

        let maxInterval = 0;
        let minInterval = Infinity;

        Object.keys(awards).forEach((producer) => {
            const awardsYears = awards[producer].sort((a, b) => a - b);
            for (let i = 0; i < awardsYears.length - 1; i++) {
                const interval = awardsYears[i + 1] - awardsYears[i];
                if (interval > maxInterval) {
                    maxInterval = interval;
                    maxIntervals = [{
                        producer,
                        interval,
                        previousWin: awardsYears[i],
                        followingWin: awardsYears[i + 1]
                    }];
                } else if (interval === maxInterval) {
                    maxIntervals.push({
                        producer,
                        interval,
                        previousWin: awardsYears[i],
                        followingWin: awardsYears[i + 1]
                    });
                }

                if (interval < minInterval) {
                    minInterval = interval;
                    minIntervals = [{
                        producer,
                        interval,
                        previousWin: awardsYears[i],
                        followingWin: awardsYears[i + 1]
                    }];
                } else if (interval === minInterval) {
                    minIntervals.push({
                        producer,
                        interval,
                        previousWin: awardsYears[i],
                        followingWin: awardsYears[i + 1]
                    });
                }
            }
        });

        retorno.max = maxIntervals;
        retorno.min = minIntervals;

        return retorno;
    }
}
