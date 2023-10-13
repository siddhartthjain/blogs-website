import {IsDefined, IsEmail, Matches, MinLength} from 'class-validator'

export class VerifyDto
{
   @IsDefined()
   @IsEmail()
   email:string

   @IsDefined()
   // @MinLength(4, {message: "OTP min lentgh should be 4"})
   otp:number
}