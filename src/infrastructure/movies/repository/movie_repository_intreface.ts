import { Movies } from "@prisma/client";

export default interface MovieRepositoryInterface {
    getAll(): Promise<Movies[]>; // ok 
    getById(id: string): Promise<Movies>;// ok
    create(movie: Movies): Promise<Movies>; // ok
    update(id: string, movie: Movies): Promise<Movies>;//ok
    delete(id: string): Promise<void>; // ok
    getWinners(): Promise<Movies[]>;
}