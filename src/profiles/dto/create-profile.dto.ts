import { User } from '../../schemas/user.schema';

export class CreateProfileDto {
  readonly uuid: string;
  readonly teamLeadName: string;
  readonly userId: User;
  readonly address: string;
  readonly inceptionDate: string;
}
