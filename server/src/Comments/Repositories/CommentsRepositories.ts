export interface CommentsContract
{
    ifCommentExists(id:number) : Record<string,any>;
    createComment(input:Record<string,any>):Record<string,any>;
    createComment(input:Record<string,any>):Record<string,any>;
    updateComment(input:Record<string,any>): Record<string,any>;
    deleteComment(input:Record<string,any>): Record<string,any>;
    postReply(input:Record<string,any>):Record<string,any>
    deleteReply(input:Record<string,any>):Record<string,any>;

}