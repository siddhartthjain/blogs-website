"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogsService_1 = __importDefault(require("../../Blogs/Service/BlogsService"));
const comments_1 = __importDefault(require("../../db/models/comments"));
class CommentsService {
    constructor() {
        this.ifCommentExists = (id) => __awaiter(this, void 0, void 0, function* () {
            const CommentExists = yield comments_1.default.findByPk(id);
            if ((CommentExists === null || CommentExists === void 0 ? void 0 : CommentExists.parentId) != null) {
                return null;
            }
            return CommentExists;
        });
        this.createComment = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { blogId, loggedUserId, comment } = inputs;
            try {
                const createdComment = yield comments_1.default.create({
                    userId: loggedUserId,
                    blogId: +blogId,
                    comment: comment,
                });
                return createdComment;
            }
            catch (error) {
                throw new Error("Not able to post Comment");
            }
        });
        this.updateComment = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { commentId, loggedUserId, newComment } = inputs;
            try {
                const comment = yield comments_1.default.findByPk(commentId);
                if (comment && loggedUserId === comment.userId) {
                    comment.update({ comment: newComment });
                    return "Comment Edited Succesfully";
                    return;
                }
                else {
                    return "You are Not allowed to upadte Comment";
                }
            }
            catch (error) {
                throw new Error("Not able to edit comment");
            }
        });
        this.deleteComment = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { commentId, loggedUserId } = inputs;
            const comment = yield comments_1.default.findByPk(commentId);
            try {
                if (comment && comment.userId === loggedUserId) {
                    const row = yield comment.destroy();
                    if (+row >= 0) {
                        return "Comment deleted Sucessfully";
                    }
                    else {
                        return "Not able to delete Comment";
                    }
                }
                else {
                    return "You are not allowed to delete Comment";
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Not able to delete Comment");
            }
        });
        this.postReply = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const blogService = new BlogsService_1.default();
            const { commentId, loggedUserId, blogId, reply } = inputs;
            try {
                if ((yield blogService.ifBlogExists(+blogId)) &&
                    (yield this.ifCommentExists(+commentId))) {
                    const createdReply = yield comments_1.default.create({
                        userId: loggedUserId,
                        blogId: +blogId,
                        comment: reply,
                        parentId: +commentId,
                    });
                    return createdReply;
                }
                else {
                    return "Not allowed to reply";
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("not able to post reply");
            }
        });
        this.deleteReply = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { replyId, loggedUserId } = inputs;
            const reply = yield comments_1.default.findByPk(replyId);
            try {
                if (reply && reply.userId === loggedUserId) {
                    const row = yield reply.destroy();
                    if (+row >= 0) {
                        return "reply deleted Succesfully";
                        return;
                    }
                    else {
                        return "Not able to delete reply";
                    }
                }
                else {
                    return "Not able to delete reply";
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Not able to delete reply");
            }
        });
    }
}
exports.default = CommentsService;
//# sourceMappingURL=commentsService.js.map