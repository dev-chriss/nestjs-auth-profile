import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type TeamDocument = HydratedDocument<User>;

@Schema()
export class Profile {
  // @Prop({ required: true })
  @Prop()
  uuid: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  teamLeadName: string;

  @Prop()
  address: string;

  @Prop()
  inceptionDate: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
