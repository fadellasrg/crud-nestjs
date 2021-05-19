import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMovieDto } from "./create-movie.dto";
import { Movie } from "./movie.entity";

@Injectable()
export class MovieService{

    constructor(@InjectRepository(Movie) private readonly movieRepository: Repository<Movie>) {}

    findAll() {
        return this.movieRepository.find();
    }

    findOne(id: number) {
        return this.movieRepository.findOneOrFail(id);
    }

    create(data: CreateMovieDto) {
        const movie = new Movie();
        movie.title = data.title;
        movie.director = data.director;
        movie.year = data.year;
        movie.minutes = data.minutes;
        movie.image = data.image;

        return this.movieRepository.save(movie);
    }

    update(data: CreateMovieDto, id: number) {
        return this.movieRepository.save({...data, id: Number(id)})
    }
    
    delete(id: number) {
        return this.movieRepository.delete(id)
    }
}