import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsArray,
  Max,
  Min,
} from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  readonly displayName: string;

  @ApiProperty({ enum: ['Male', 'Female'] })
  @IsNotEmpty()
  readonly gender: string;

  @ApiProperty({
    type: Number,
    description: 'Min value 10, Max value 300',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @Max(300)
  readonly height: number;

  @ApiProperty({
    type: Number,
    description: 'Min value 10, Max value 300',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @Max(300)
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

  @ApiProperty({
    type: String,
    description: `if want empty string you can use 'horoscope: ""'`,
    example: '',
  })
  @IsString() // still allowed empty string
  readonly horoscope: string;

  @ApiProperty({
    type: String,
    description: `if want empty string you can use 'imageFilename: ""'`,
    example: '',
  })
  @IsString() // still allowed empty string
  readonly imageFilename: string;

  @ApiProperty({
    type: Array,
    description: `if want empty array you can use [] as value`,
    example: [],
  })
  @IsArray()
  @IsString({ each: true }) // prevent non string in each array
  @IsNotEmpty({ each: true }) // prevent empty string in each array
  readonly interests: string[];
}
