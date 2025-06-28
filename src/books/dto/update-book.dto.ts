import { CATEGORY } from '../chemas/book.schema';

export class UpdateBookDto {
    readonly author: string;
    readonly description: string;
    readonly title: string;
    readonly price: number;
    readonly category: CATEGORY;
}