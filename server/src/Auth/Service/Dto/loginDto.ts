import {IsDefined, IsEmail, Matches, MinLength} from 'class-validator'

export class LoginDto
{
    
    @IsDefined()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be strong with at least one lowercase letter, one uppercase letter, one digit, and one special character'
  })
  password: string;

  @IsDefined()
  @IsEmail()
  email:string


}