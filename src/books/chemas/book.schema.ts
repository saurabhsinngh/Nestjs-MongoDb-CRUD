import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../schamas/user.schema";
import mongoose from "mongoose";

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User
}

export const BookSchema = SchemaFactory.createForClass(Book);