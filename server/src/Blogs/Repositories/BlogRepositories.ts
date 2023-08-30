import { ParsedQs } from "qs"

export default interface BlogContract 
{
    ifBlogExists(id: number): Record<string,any>
    getAllBlog(inputs: ParsedQs): Record<string,any>
    createBlog(inputs: { tags: any; blogdata: any }): Record<string,any>
    updateBlog(inputs: { BlogId: string; loggedUserid: any; title: any; description: any }): Record<string,any>
    deleteBlog(inputs: any): Record<string,any>
}