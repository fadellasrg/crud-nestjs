import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movies/movie.controller';
import { Movie } from './movies/movie.entity';
import { MovieService } from './movies/movie.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'movies',
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([Movie]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class AppModule {}
