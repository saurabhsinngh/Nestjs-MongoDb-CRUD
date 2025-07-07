import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CATEGORY } from '../chemas/book.schema';
import { User } from '../../schamas/user.schema';

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

    @IsEmpty({message: 'You can not pass the user Id' })    
    readonly user: User;
}