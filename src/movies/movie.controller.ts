import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseFilters } from "@nestjs/common";
import { CreateMovieDto } from "./create-movie.dto";
import { EntityNotFoundExceptionFilter } from "./entity-not-found-exception.filter";
import { MovieService } from "./movie.service";

@Controller('movies') // endpoint
@UseFilters(new EntityNotFoundExceptionFilter)
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    async findAll() {
        return {
            data: await this.movieService.findAll()
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            data: await this.movieService.findOne(id)
        }
    }

    @Post()
    async create(@Body() data: CreateMovieDto) {
        return {
            data: await this.movieService.create(data)
        }
    }

    @Put(':id')
    async update(@Body() data: CreateMovieDto, @Param('id') id: number) {
        return {
            data: await this.movieService.update(data, id)
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number) {
        await this.movieService.delete(id);
    }
}