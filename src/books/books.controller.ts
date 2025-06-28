import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './chemas/book.schema';

@Controller('book')
export class BooksController {
    constructor(private bookService: BooksService) { }

    @Get()
    async findAllBook(): Promise<Book[]> {
        return this.bookService.listBook();
    }

    @Post('create')
    async create(@Body() book): Promise<Book>{
        return this.bookService.create(book)
    }
}
