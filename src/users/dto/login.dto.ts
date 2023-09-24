import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: `keyword could be username or email`,
  })
  @IsNotEmpty()
  readonly keyword: string;

  @IsNotEmpty()
  readonly password: string;
}
