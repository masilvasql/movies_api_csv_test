export interface GetProducerWithLongestIntervalAndTwoConsecutivesAwardsOutputDto {
    min: Data[]
    max: Data[]
}



interface Data {
    producer: string
    interval: number
    previousWin: number
    followingWin: number
}