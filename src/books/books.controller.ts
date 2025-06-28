import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './chemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BooksController {
    constructor(private bookService: BooksService) { }

    @Get()
    async findAllBook(): Promise<Book[]> {
        return this.bookService.listBook();
    }

    @Post('create')
    async create(@Body() book: CreateBookDto): Promise<Book>{
        return this.bookService.create(book)
    }

    @Get(':id')
    async getBookById(@Param('id') id: string): Promise<Book>{
        return this.bookService.getBookById(id)
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book>{
        return this.bookService.update(id, book)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book>{
        return this.bookService.deleteById(id)
    }
}
