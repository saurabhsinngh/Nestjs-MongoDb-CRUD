import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum CATEGORY {
    ADVANTURE =  'advanture',
    CLASSIC = 'classic',
    CRIME = 'crime',
    FANTACY = 'fantacy'
}
@Schema({
    timestamps: true
})

export class Book {
    @Prop()
    title: string;

    @Prop()
    author: string;

    @Prop()
    description: string;

    @Prop()
    category: CATEGORY
}

export const BookSchema = SchemaFactory.createForClass(Book);