import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getBookById(id: string): Promise<Book>{
        let book = await this.BookModel.findById(id);
        if (!book){
            throw new NotFoundException("Book data is not found");
        }
        return book;
    }

    async update(id: string, book: Book): Promise<Book>{
        let updated =  await this.BookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })

        if (!updated) {
            throw new NotFoundException("Book data is not found");
        }
        
        return updated;
    }

    async deleteById(id: string): Promise<Book>{
        let deleted =  await this.BookModel.findByIdAndDelete(id)
        if(!deleted){
            throw new NotFoundException("Book data is not found");
        }
        return deleted;
    }
}
