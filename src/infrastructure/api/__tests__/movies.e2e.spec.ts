import request from 'supertest'

import { prisma } from "../../database/prisma.database"
import { app } from '../../api/express'

import { execSync } from 'child_process';
import MovieRepository from "../../movies/repository/movie_reposittory";
import CreateMovieUsecase from "../../../usecase/create/crate_movie_usecase";
import { CreateMovieHandler } from "../handlers/create_movie_handler";
import findAllMoviesUsecase from '../../../usecase/find_all/find_all_usecase';
import { FindAllMoviesHandler } from "../handlers/find_all_movies_handler";
import GetMovieByIdUsecase from "../../../usecase/get_by_id/get_movie_by_id_usecase";
import { FindMovieByIdHandler } from "../handlers/find_all_movie_by_id";
import DeleteMovieByIdUsecase from "../../../usecase/delete_by_id/delete_movi_by_id";
import { DeleteMovieByIdHandler } from "../handlers/delete_movie_by_id";
import UpdateMovieUsecase from "../../../usecase/update/update_movie_usecase";
import { UpdateMovieByIdHandler } from "../handlers/update_movie_by_id";
import GetProducerWithLongestIntervalAndTwoConsecutivesAwardsUsecase from "../../../usecase/get_producer_with_longest_interval_and_two_consecutives_awards/get_producer_with_longest_interval_and_two_consecutives_awards_usecase";
import { GetProducerWithLongestIntervalAndTwoConsecutivesAwardsHandler } from "../handlers/get_producer_with_longest_interval_and_two_consecutives_awards_handler";

execSync('npx prisma generate');
execSync('npx prisma migrate deploy');
describe('Movies API', () => {

    beforeAll(async () => {
        await prisma.movies.deleteMany();
    });

    afterEach(async () => {
        await prisma.movies.deleteMany();
    });

    const repository = new MovieRepository();


    const createMovieUsecase = new CreateMovieUsecase(repository);

    const findlMoviesUsecase = new findAllMoviesUsecase(repository);


    const findByIdUsecase = new GetMovieByIdUsecase(repository);


    const deleteMovieByIdUsecase = new DeleteMovieByIdUsecase(repository);


    const updateMovieUsecase = new UpdateMovieUsecase(repository);


    const awardsIntervalUsecase = new GetProducerWithLongestIntervalAndTwoConsecutivesAwardsUsecase(repository);


    it('should return a list of movies', async () => {
        await createMovieUsecase.execute({
            producers: ['producer1', 'producer2'],
            studios: ['studio1', 'studio2'],
            title: 'title',
            winner: 'yes',
            year: 2021
        });

        await createMovieUsecase.execute({
            producers: ['producer 3', 'producer 4'],
            studios: ['studio 3', 'studio 4'],
            title: 'title 2',
            winner: 'yes',
            year: 2022
        });

        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.body.movies).toHaveLength(2);

        expect(response.body.movies[0]).toEqual({
            id: expect.any(String),
            producers: 'producer1,producer2',
            studios: 'studio1,studio2',
            title: 'title',
            winner: 'yes',
            year: 2021
        });

        expect(response.body.movies[1]).toEqual({
            id: expect.any(String),
            producers: 'producer 3,producer 4',
            studios: 'studio 3,studio 4',
            title: 'title 2',
            winner: 'yes',
            year: 2022
        });
    })

    it('should return a movie by id', async () => {
        const movie = await createMovieUsecase.execute({
            producers: ['producer1', 'producer2'],
            studios: ['studio1', 'studio2'],
            title: 'title',
            winner: 'yes',
            year: 2021
        });

        const response = await request(app).get(`/movies/${movie.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: movie.id,
            producers: 'producer1,producer2',
            studios: 'studio1,studio2',
            title: 'title',
            winner: 'yes',
            year: 2021
        });
    })

    it('should return 404 if movie not found', async () => {
        const response = await request(app).get(`/movies/123`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            message: 'Movie not found'
        });
    })

    it('should create a movie', async () => {
        const response = await request(app)
            .post('/movies')
            .send({
                producers: ['producer1', 'producer2'],
                studios: ['studio1', 'studio2'],
                title: 'title',
                winner: 'yes',
                year: 2021
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: expect.any(String),
            producers: ['producer1', 'producer2'],
            studios: ['studio1', 'studio2'],
            title: 'title',
            winner: 'yes',
            year: 2021
        });
    })


    it('should return 400 if some field is missing', async () => {
        const response = await request(app)
            .post('/movies')
            .send({
                producers: ['producer1', 'producer2'],
                studios: ['studio1', 'studio2'],
                title: 'title',
                winner: 'yes',
            });

        expect(response.status).toBe(500);
        const keyBody = Object.keys(response.body);
        expect(keyBody).toEqual(['message']);
    })

    it('should update a movie', async () => {
        const movie = await createMovieUsecase.execute({
            producers: ['producer1', 'producer2'],
            studios: ['studio1', 'studio2'],
            title: 'title',
            winner: 'yes',
            year: 2021
        });

        const response = await request(app)
            .put(`/movies/${movie.id}`)
            .send({
                producers: ['producer atualizado', 'producer2 atualizado'],
                studios: ['studio1 atualizado', 'studio2 atualizado'],
                title: 'title atualizado',
                winner: 'no',
                year: 2022
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: movie.id,
            producers: 'producer atualizado, producer2 atualizado',
            studios: 'studio1 atualizado, studio2 atualizado',
            title: 'title atualizado',
            winner: 'no',
            year: 2022
        });
    })

    it('should return 404 if movie not found', async () => {
        const response = await request(app)
            .put(`/movies/123`)
            .send({
                producers: ['producer atualizado', 'producer2 atualizado'],
                studios: ['studio1 atualizado', 'studio2 atualizado'],
                title: 'title atualizado',
                winner: 'no',
                year: 2022
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            message: `Movie with id 123 not found`
        });
    })

    it('should delete a movie', async () => {
        const movie = await createMovieUsecase.execute({
            producers: ['producer1', 'producer2'],
            studios: ['studio1', 'studio2'],
            title: 'title',
            winner: 'yes',
            year: 2021
        });

        const response = await request(app)
            .delete(`/movies/${movie.id}`);

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    })

    it('should return 404 if movie not found', async () => {
        const response = await request(app)
            .delete(`/movies/123`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            message: `Movie with id 123 not found`
        });
    })

    it('should return producer with longest interval and two consecutives awards', async () => {

        await createMovieUsecase.execute({
            producers: ['producer1', 'producer2'],
            studios: ['studio1', 'studio2'],
            title: 'title',
            winner: 'yes',
            year: 2002
        });

        await createMovieUsecase.execute({
            producers: ['producer1', 'producer2'],
            studios: ['studio1', 'studio2'],
            title: 'title',
            winner: 'yes',
            year: 2015
        });

        await createMovieUsecase.execute({
            producers: ['producer3', 'producer4'],
            studios: ['studio3', 'studio4'],
            title: 'title',
            winner: 'yes',
            year: 2024
        });

        await createMovieUsecase.execute({
            producers: ['producer3', 'producer4'],
            studios: ['studio3', 'studio4'],
            title: 'title',
            winner: 'yes',
            year: 2025
        });

        const response = await request(app).get('/movies/awards/interval');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            max: [
                {
                    producer: 'producer1',
                    interval: 13,
                    previousWin: 2002,
                    followingWin: 2015
                },
                {
                    producer: 'producer2',
                    interval: 13,
                    previousWin: 2002,
                    followingWin: 2015
                }
            ],
            min: [
                {
                    producer: 'producer3',
                    interval: 1,
                    previousWin: 2024,
                    followingWin: 2025
                },
                {
                    producer: 'producer4',
                    interval: 1,
                    previousWin: 2024,
                    followingWin: 2025
                }
            ]
        });
    })
})