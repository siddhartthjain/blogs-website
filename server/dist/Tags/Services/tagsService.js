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
exports.postTags = exports.postTagsService = void 0;
const blogs_1 = __importDefault(require("../../db/models/blogs"));
const tags_1 = __importDefault(require("../../db/models/tags"));
const blogTags_1 = __importDefault(require("../../db/models/blogTags"));
const postTagsService = (loggedUserId, blogId, tags) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_1.default.findByPk(blogId);
    try {
        if (blog && loggedUserId === (blog === null || blog === void 0 ? void 0 : blog.userId)) {
            tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
                const existingTag = yield tags_1.default.findOne({ where: { tag: tag } });
                console.log(existingTag);
                if (!existingTag) {
                    const createdTag = yield tags_1.default.create({ tag: tag });
                    const createdTagId = createdTag.id;
                    blogTags_1.default.create({ blogId: +blogId, tagId: createdTagId });
                }
                else {
                    yield blogTags_1.default.create({ blogId: +blogId, tagId: existingTag.id });
                }
            }));
            return true;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
    return;
});
exports.postTagsService = postTagsService;
const postTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const loggedUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { id: blogId } = req.params;
    const { tags } = req.body;
    const blog = yield blogs_1.default.findByPk(blogId);
    if (yield (0, exports.postTagsService)(loggedUserId, +blogId, tags)) {
        res.status(200).json({ message: "tags have been posted succesfully" });
        return;
    }
    else {
        res.status(400).json({ error: "Not able to post Tags" });
        return;
    }
});
exports.postTags = postTags;
//# sourceMappingURL=tagsService.js.map