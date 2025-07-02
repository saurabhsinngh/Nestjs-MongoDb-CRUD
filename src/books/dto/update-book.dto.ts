import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CATEGORY } from '../chemas/book.schema';

export class UpdateBookDto {

    @IsOptional()    
    @IsString()
    readonly author: string;

    @IsOptional()    
    @IsString()
    readonly description: string;

    @IsOptional()    
    @IsString()
    readonly title: string;

    @IsOptional()    
    @IsNumber()
    readonly price: number;

    @IsOptional()    
    @IsEnum(CATEGORY, { message: 'Please enter the correct cotegory'})
    readonly category: CATEGORY;
}