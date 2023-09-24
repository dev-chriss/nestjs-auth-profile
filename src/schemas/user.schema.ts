import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: {
    type: mongoose.Schema.Types.ObjectId;
    index: true;
    required: true;
    auto: true;
  };

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (doc, ret, opt) => {
    delete ret.password;
    return ret;
  },
});
