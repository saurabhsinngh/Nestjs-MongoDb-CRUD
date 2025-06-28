import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './chemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name)
        private BookModel: mongoose.Model<Book>
    ){}

    async listBook(): Promise <Book[]>{
        let books = await this.BookModel.find();
        return books;
    }

    async create(book: Book): Promise<Book>{
        let response = await this.BookModel.create(book);
        return response;
    }
}
