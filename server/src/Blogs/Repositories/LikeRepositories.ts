export default  interface LikeContract 
{
    createLike(inputs:Record<string,any>): Record<string,any>;
    destroyIfBlogIdUserId(inputs:Record<string,any>): Record<string,any>

}