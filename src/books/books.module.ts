import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './chemas/book.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(
      [
        { name: 'Book', schema: BookSchema }
      ])], // It contains the array of schema where first schema is Book.

  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule { }
