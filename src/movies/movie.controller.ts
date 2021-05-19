import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UploadedFile, UseFilters, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "src/utils/file-upload.utils";
import { CreateMovieDto } from "./create-movie.dto";
import { EntityNotFoundExceptionFilter } from "./entity-not-found-exception.filter";
import { MovieService } from "./movie.service";
import { diskStorage } from 'multer';

@Controller('movies') // endpoint
@UseFilters(new EntityNotFoundExceptionFilter)
@UseInterceptors(
    FileInterceptor("image", {
        storage: diskStorage({
        destination: "./uploads",
        filename: editFileName
    }),
    fileFilter: imageFileFilter,
    }),
)

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
    async create(@UploadedFile() file, @Body() data: CreateMovieDto) {
        data.image = file.filename
        return {
            data: await this.movieService.create(data)
        }
    }

    @Put(':id')
    async update(@UploadedFile() file, @Body() data: CreateMovieDto, @Param('id') id: number) {
        const detail = await this.movieService.findOne(id)
        const fs = require('fs')
        const path = `./uploads/${detail.image}`
        if (fs.existsSync(path)) {
            fs.unlinkSync(path)
        }
        data.image = file.filename
        return {
            data: await this.movieService.update(data, id)
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number) {
        await this.movieService.delete(id);
    }

    @Get('/img/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './uploads' });
    }
}


