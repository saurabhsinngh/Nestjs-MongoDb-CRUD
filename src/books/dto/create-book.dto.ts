import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CATEGORY } from '../chemas/book.schema';
import { User } from '../../schamas/user.schema';

export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    readonly author: string;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(CATEGORY, { message: 'Please enter the correct cotegory'})
    readonly category: CATEGORY;

    @IsEmpty({message: 'You can not pass the user Id' })    
    readonly user: User;
}