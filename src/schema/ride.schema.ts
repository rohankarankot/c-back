import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schema"; // Adjust the import path as necessary

export type RideDocument = Ride & Document;

export enum RideStatus {
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    ACTIVE = 'active',
}

@Schema({ timestamps: true })

export class Ride {

    @Prop({ required: true })
    to: string;

    @Prop({ required: true })
    postedBy: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true })
    from: string;

    @Prop({ required: true })
    maxCapacity: number;

    @Prop({ required: true })
    contact: number;

    @Prop({ required: true })
    active: boolean;

    @Prop({ required: true, enum: RideStatus, default: RideStatus.ACTIVE })
    status: RideStatus;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    creatorImg: string;

    @Prop({ required: true })
    time: string;

    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
    joinedUsers: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: User;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const RideModal = SchemaFactory.createForClass(Ride);
