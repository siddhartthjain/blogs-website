import { IsArray, IsDefined, IsNotEmpty, isDefined } from "class-validator";

export class CreateBlogDto
{
    @IsDefined()
    title: string;

    @IsDefined()
    description : string;

    @IsDefined()
    @IsArray()
    @IsNotEmpty()
    tags : [];

}