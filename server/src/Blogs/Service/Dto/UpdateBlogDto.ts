import { IsDefined, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";

export class UpdateBlogDto
{
    
   
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    description: string;
    
    @ValidateIf(o=> (!o.title && !o.description))
    @IsOptional()   
    like:boolean

}