import fs from 'fs';
import csv from 'csv-parser';
import { prisma } from '../database/prisma.database';
import { Movies } from '@prisma/client';
import { v4 as uuid } from 'uuid';

export interface CsvReaderInput {
    filePath: string;
    batchSize: number;
    isToIgnoreFirstLine: boolean;
}

export default class CsvReader {
    async insertCsvDataOnDatabase({ filePath, batchSize, isToIgnoreFirstLine }: CsvReaderInput) {
        console.info('Starting to read CSV file');
        console.time('Read CSV file');

        if (!fs.existsSync(filePath)) {
            throw new Error('File not found');
        }

        const stream = fs.createReadStream(filePath).pipe(csv({ separator: ';' }));
        let movies: Movies[] = [];
        let isFirstRow = isToIgnoreFirstLine;

        for await (const row of stream) {
            if (isFirstRow) {
                isFirstRow = false;
                continue;
            }

            const { year, title, studios, producers, winner } = row;
            let movie: Movies = {
                id: uuid(),
                year: parseInt(year, 10),
                title,
                studios,
                producers,
                winner
            };
            movies.push(movie);
        }


        const existingMovies = await prisma.movies.findMany({
            where: {
                OR: movies.map(movie => ({
                    year: movie.year,
                    title: movie.title,
                    studios: movie.studios,
                    producers: movie.producers,
                    winner: movie.winner
                }))
            }
        });


        const existingMoviesSet = new Set(existingMovies.map(movie => `${movie.year}|${movie.title}|${movie.studios}|${movie.producers}|${movie.winner}`));


        const moviesToInsert = movies.filter(movie => {
            const key = `${movie.year}|${movie.title}|${movie.studios}|${movie.producers}|${movie.winner}`;
            return !existingMoviesSet.has(key);
        });


        for (let i = 0; i < moviesToInsert.length; i += batchSize) {
            const batch = moviesToInsert.slice(i, i + batchSize);
            await this.insertBatchOnDatabase(batch);
        }

        console.info('Finished reading CSV file');
        console.timeEnd('Read CSV file');
    }

    async insertBatchOnDatabase(movies: Movies[]) {
        try {
            await prisma.movies.createMany({
                data: movies
            });
        } catch (error) {
            console.error(`Error on insert batch into the database: ${error}`);
            throw error;
        }
    }
}
