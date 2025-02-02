import { IsNotEmpty,  } from "class-validator";
import { IsUrl } from "@core/validators/is-url.validator";


export class ShortenUrlDto {
    @IsNotEmpty()
    @IsUrl() 
    url: string;
  }