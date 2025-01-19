import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty({ example: 'John Doe', description: 'Колдонуучунун аты' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Электрондук почта',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
