import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schema"; // Adjust the import path as necessary

export type RideDocument = Ride & Document;

@Schema({ timestamps: true })
export class Ride {
    @Prop({ required: true })
    to: string;


    @Prop({ required: true })
    postedBy: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    from: string;

    @Prop({ required: true })
    maxCapacity: number;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    time: string; // Or use Date if you want to store both date and time together

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: User;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const RideModal = SchemaFactory.createForClass(Ride);
