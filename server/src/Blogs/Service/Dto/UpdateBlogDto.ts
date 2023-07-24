import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateBlogDto
{
    
   
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    like:boolean

}