import { Movies } from '@prisma/client';
import { prisma } from '../../database/prisma.database'
import MovieRepositoryInterface from './movie_repository_intreface';

export default class MovieRepository implements MovieRepositoryInterface {
    async getAll(): Promise<Movies[]> {
        const movies = await prisma.movies.findMany()
        return movies
    }

    async getById(id: string): Promise<Movies> {
        const movie = await prisma.movies.findUnique({
            where: {
                id: id
            }
        })
        return movie as Movies
    }

    async create(movie: Movies): Promise<Movies> {
        const newMovie = await prisma.movies.create({
            data: movie
        })
        return newMovie
    }

    async update(id: string, movie: Movies): Promise<Movies> {
        const updatedMovie = await prisma.movies.update({
            where: {
                id: id
            },
            data: movie
        })
        return updatedMovie
    }

    async delete(id: string): Promise<void> {
        await prisma.movies.delete({
            where: {
                id: id
            }
        })
    }
    //
    async getWinners(): Promise<Movies[]> {
        const movies = await prisma.movies.findMany({
            where: {
                winner: 'yes'
            },
            orderBy: {
                year: 'asc'
            }
        })
        return movies
    }

}