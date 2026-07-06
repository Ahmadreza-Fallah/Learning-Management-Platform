import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @ApiProperty({
    description: 'Username for the account',
    example: 'johndoe',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  userName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the account',
    example: 'StrongPass1!',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @Length(8, 100)
  password: string;

  @ApiProperty({
    description: 'Mobile phone number starting with 09',
    example: '09123456789',
    pattern: '^09\\d{9}$',
  })
  @Matches(/^09\d{9}$/, {
    message: 'Mobile number is invalid.',
  })
  mobile: string;
}
