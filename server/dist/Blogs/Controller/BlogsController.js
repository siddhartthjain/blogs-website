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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const likes_1 = __importDefault(require("../../db/models/likes"));
const BlogsService_1 = __importDefault(require("../Service/BlogsService"));
const LikesService_1 = __importDefault(require("../Service/LikesService"));
class BlogController {
    constructor() {
        this.getAllBlogs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // get all blogs for all user
            // console.log("blogs associations", Blogs.associations)
            console.log("im here");
            const { userId, blogId, items, page, sort, tags } = req.query;
            const inputs = req.query;
            inputs.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            try {
                res.json(yield this.blogService.getAllBlog(inputs));
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Not able to Get all blogs");
            }
            // if(req.user)
            // {
            //   const {id:loggedUserId}= req.user;
            //   const allBlogsjson = allBlogsData.map((blog: { toJSON: () => any; })=>blog.toJSON());
            //   const updatedBlogsData= allBlogsjson.map()
            //   res.json({updatedBlogs});
            // }
            // else{
            //   res.json({ allBlogsData });
            // }
        });
        this.createBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const _c = req.body, { tags } = _c, blogdata = __rest(_c, ["tags"]);
            blogdata.userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
            const inputs = { tags, blogdata };
            try {
                res.json(yield this.blogService.createBlog(inputs));
            }
            catch (error) {
                res.status(500).send("Not able to create Blog");
            }
        });
        this.updateBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const BlogId = req.params.id;
            const loggedUser = req.user;
            const { id: loggedUserid } = loggedUser;
            let { title, description } = req.body;
            const inputs = { BlogId, loggedUserid, title, description };
            // only want to change title and description till now
            try {
                res.json(yield this.blogService.updateBlog(inputs));
            }
            catch (error) {
                res.status(500).send("Not able to update The Blog");
            }
        });
        this.likeBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const blogId = req.params.blogId;
            const { liked } = req.body;
            const loggedUser = req.user;
            const { id: loggedUserId } = loggedUser;
            const inputs = { blogId, liked, loggedUserId };
            try {
                const blogExists = yield this.blogService.ifBlogExists(+blogId);
                const obj = {
                    userId: +loggedUserId,
                    blogId: +blogId,
                };
                if (blogExists && liked) {
                    if (yield likes_1.default.findOne({ where: obj })) {
                        res.status(400).json("Blog already liked");
                        return;
                    }
                    try {
                        yield this.likeService.createLike(obj);
                        const oldLikes = blogExists.likes;
                        yield blogExists.update({ likes: oldLikes + 1 });
                        res.status(200).json("Blog liked Succesfully");
                    }
                    catch (error) {
                        res.json("Not able to Like Blog");
                    }
                }
                else if (blogExists && !liked) {
                    if (yield likes_1.default.findOne({ where: obj })) {
                        try {
                            const deletedRow = yield this.likeService.destroyIfBlogIdUserId({ blogId, loggedUserId });
                            if (deletedRow) {
                                const oldLikes = blogExists.likes;
                                yield blogExists.update({ likes: oldLikes - 1 });
                                res.status(200).json("Blog disliked Succesfully");
                            }
                        }
                        catch (error) {
                            console.log(error);
                            res.status(500).send("Internal server Error");
                        }
                    }
                    else {
                        res.status(400).json("You cannot dislike the blog");
                        return;
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json("Not able to perform the Action");
            }
        });
        this.deleteBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const BlogId = req.params.id;
            const loggedUserId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
            const inputs = { BlogId, loggedUserId };
            try {
                res.json(yield this.blogService.deleteBlog(inputs));
            }
            catch (error) {
                res.status(500).send("Not able to delete Blog");
            }
        });
        this.blogService = new BlogsService_1.default();
        this.likeService = new LikesService_1.default();
    }
}
exports.BlogController = BlogController;
//# sourceMappingURL=BlogsController.js.map