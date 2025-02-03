import { IsNotEmpty,  } from "class-validator";
import { IsUrl } from "@core/validators/is-url.validator";
import { ApiProperty } from "@nestjs/swagger";


export class ShortenUrlDto {
  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://example.com',
  })
    @IsNotEmpty()
    @IsUrl() 
    url: string;
  }