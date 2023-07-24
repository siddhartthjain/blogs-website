import { IsDefined, isDefined } from "class-validator";

export class CreateBlogDto
{
    @IsDefined()
    title: string;

    @IsDefined()
    description : string;

}