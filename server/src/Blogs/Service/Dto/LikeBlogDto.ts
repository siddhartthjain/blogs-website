import {IsBoolean, IsDefined} from 'class-validator'

export class LikeBlogDto
{
    @IsDefined()
    @IsBoolean()
    liked:Boolean;
}