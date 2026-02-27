import { IsNotEmpty, IsJWT, IsString, Length } from "class-validator";

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username:string;
  @IsNotEmpty()
  @IsString()
  @Length(8,16)
  password:string;
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
