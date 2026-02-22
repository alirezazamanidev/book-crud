import { IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username:string;
  @IsNotEmpty()
  @IsString()
  @Length(8,16)
  password:string;
}
