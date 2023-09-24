import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { GENDER_ENUM, ZODIAC_ENUM } from '../constant/profiles.enum';

export type ProfileDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class Profile {
  // @Prop({ required: true })
  // @Prop()
  // uuid: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  displayName: string;

  @Prop({ enum: GENDER_ENUM, required: true })
  gender: string;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;

  // date is following what is frontend use
  @Prop({ required: true })
  birthday: string;

  @Prop({ enum: ZODIAC_ENUM, required: true })
  zodiac: string;

  // @Prop({ required: false })
  // horoscope: HOROSCOPE_ENUM;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
