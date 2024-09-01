import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  mobile: string;

  @Prop({ required: false })
  DOB: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false, enum: Gender })
  gender: Gender;
}

export const UserModel = SchemaFactory.createForClass(User);
