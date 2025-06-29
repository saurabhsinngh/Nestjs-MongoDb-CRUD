import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './chemas/book.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name)
        private BookModel: mongoose.Model<Book>
    ){}

    async listBook(query:Query): Promise <Book[]>{
        let search: any= query.search?
            {
                $or: [
                    { title: { $regex: query.search, $options: 'i' }},
                    { author: { $regex: query.search, $options: 'i' }}
                ]
            } : {};

        // If limit is passed, apply pagination
        if (query.limit) {
            const resPerPage = Number(query.limit) || 2;
            const currentPage = Number(query.page) || 1;
            const skip = resPerPage * (currentPage - 1);

            return await this.BookModel.find(search).limit(resPerPage).skip(skip);
        }

        let books = await this.BookModel.find(search);
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
