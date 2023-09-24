import { Types } from 'mongoose';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    type: String,
    description: 'UserId whos have this profile',
  })
  @IsNotEmpty()
  readonly userId: Types.ObjectId;

  @IsNotEmpty()
  readonly displayName: string;

  @ApiProperty({ enum: ['Male', 'Female'] })
  @IsNotEmpty()
  readonly gender: string;

  @IsInt()
  @IsNotEmpty()
  readonly height: number;

  @IsInt()
  @IsNotEmpty()
  readonly weight: number;

  @ApiProperty({
    type: String,
    description: 'Date string with ISO format YYYY-MM-DD',
  })
  @IsNotEmpty()
  readonly birthday: string;

  @ApiProperty({
    enum: [
      'Capricorn',
      'Aquarius',
      'Pisces',
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
    ],
  })
  @IsNotEmpty()
  readonly zodiac: string;

  // readonly horoscope: string;
}
