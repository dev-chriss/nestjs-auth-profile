import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GENDER_ENUM, ZODIAC_ENUM } from '../constant/profiles.enum';

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

  @Prop({ required: true })
  birthday: string;

  @Prop({ enum: ZODIAC_ENUM, required: true })
  zodiac: string;

  @Prop({ required: false, default: '' })
  horoscope: string;

  @Prop({ required: false, default: [] })
  interests: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret['__v'];
    delete ret['createdAt'];
    delete ret['updatedAt'];
    return ret;
  },
});
