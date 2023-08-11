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
exports.deleteReply = exports.postReply = exports.deleteComment = exports.editComment = exports.postComment = void 0;
const blogs_1 = __importDefault(require("../../db/models/blogs"));
const comments_1 = __importDefault(require("../../db/models/comments"));
const ifCommentExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const CommentExists = yield comments_1.default.findByPk(id);
    if ((CommentExists === null || CommentExists === void 0 ? void 0 : CommentExists.parentId) != null) {
        return null;
    }
    return CommentExists;
});
const ifBlogExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blogExists = yield blogs_1.default.findByPk(id);
    return blogExists;
});
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const loggedUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { id: blogId } = req.params;
    const { comment } = req.body;
    try {
        yield comments_1.default.create({
            userId: loggedUserId,
            blogId: +blogId,
            comment: comment,
        });
        res.status(200).json({ message: "Commented succesfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Not able to Comment on Blog" });
    }
});
exports.postComment = postComment;
const editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { commentId } = req.params;
    const { comment: newComment } = req.body;
    const loggedUserId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const comment = yield comments_1.default.findByPk(commentId);
        if (comment && loggedUserId === comment.userId) {
            comment.update({ comment: newComment });
            res.status(200).json({ message: "Comment Edited Succesfully" });
            return;
        }
        else {
            res.status(400).json({ error: "Comment cant be edited" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ error: "not able to delet comment" });
    }
});
exports.editComment = editComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { commentId } = req.params;
    const loggedUserId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const comment = yield comments_1.default.findByPk(commentId);
    try {
        if (comment && comment.userId === loggedUserId) {
            const row = yield comment.destroy();
            if (+row >= 0) {
                res.status(200).json({ message: "Comment deleted succesfully" });
                return;
            }
            else {
                res.status(400).json({ error: "Not able to delete the comment" });
            }
        }
        else {
            res.status(400).json({ error: "You are not allowed to delete Comment" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Not able to delete Comment" });
    }
});
exports.deleteComment = deleteComment;
const postReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id: blogId, commentId } = req.params;
    const { reply } = req.body;
    const loggedUserId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    try {
        if ((yield ifBlogExists(+blogId)) && (yield ifCommentExists(+commentId))) {
            yield comments_1.default.create({
                userId: loggedUserId,
                blogId: +blogId,
                comment: reply,
                parentId: +commentId,
            });
            res.status(200).json({ message: "reply posted succesfully" });
        }
        else {
            res.status(400).json({ error: "Not allowed to reply" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Not allowed to reply" });
    }
});
exports.postReply = postReply;
const deleteReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { replyId } = req.params;
    const loggedUserId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
    const reply = yield comments_1.default.findByPk(replyId);
    try {
        if (reply && reply.userId === loggedUserId) {
            const row = yield reply.destroy();
            if (+row >= 0) {
                res.json({ message: "Reply deleted succesfully" });
                return;
            }
            else {
                res.json({ error: "Not able to delete reply" });
            }
        }
        else {
            res.status(400).json({ error: "You are not allowed to delete Reply" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Not able to delete Reply" });
    }
});
exports.deleteReply = deleteReply;
//# sourceMappingURL=commentsService.js.map