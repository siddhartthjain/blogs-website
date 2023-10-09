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
const commentsService_1 = __importDefault(require("../Service/commentsService"));
const BlogsService_1 = __importDefault(require("../../Blogs/Service/BlogsService"));
class CommentController {
    constructor() {
        this.postComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const loggedUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { id: blogId } = req.params;
            const { comment } = req.body;
            console.log("req is", req.body);
            const inputs = {
                loggedUserId,
                blogId,
                comment
            };
            try {
                if (yield this.blogService.ifBlogExists(+blogId)) {
                    res.json(yield this.commentService.createComment(inputs));
                    return;
                }
                res.status(404).send("Blog doesnt exists");
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Not able to post Comment");
            }
        });
        this.editComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const { commentId } = req.params;
            const { comment: newComment } = req.body;
            const loggedUserId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
            const inputs = { commentId, newComment, loggedUserId };
            try {
                res.json(yield this.commentService.updateComment(inputs));
            }
            catch (error) {
                res.status(500).send("Not able to Comment");
            }
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const { commentId } = req.params;
            const loggedUserId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            const inputs = { commentId, loggedUserId };
            try {
                res.json(this.commentService.deleteComment(inputs));
            }
            catch (error) {
                res.status(500).send("Not able to delete the Commnet");
            }
        });
        this.postReply = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const { id: blogId, commentId } = req.params;
            const { reply } = req.body;
            const loggedUserId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
            const inputs = { blogId, commentId, reply, loggedUserId };
            try {
                res.json(yield this.commentService.postReply(inputs));
            }
            catch (error) {
                res.status(500).send("Not able to post comment");
            }
        });
        this.deleteReply = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _e;
            const { replyId } = req.params;
            const loggedUserId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
            const inputs = { replyId, loggedUserId };
            try {
                res.json(yield this.commentService.deleteReply(inputs));
            }
            catch (error) {
            }
        });
        this.commentService = new commentsService_1.default();
        this.blogService = new BlogsService_1.default();
    }
}
exports.default = CommentController;
//# sourceMappingURL=commentsController.js.map