"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const BlogsService_1 = require("../Service/BlogsService");
const validate_1 = require("../../Validation/validate");
const Dto_1 = require("../Service/Dto/");
const jwtStartegy_1 = require("../../Jwt/jwtStartegy");
const router = express_1.default.Router();
router.get('/allBlogs', BlogsService_1.getAllBlogs);
router.use(jwtStartegy_1.authMiddleware);
router.get('/', BlogsService_1.getAllBlogs);
router.post('/', (0, validate_1.validationMiddleware)(Dto_1.CreateBlogDto), BlogsService_1.createBlog);
router.patch('/:id', (0, validate_1.validationMiddleware)(Dto_1.UpdateBlogDto), BlogsService_1.updateBlog);
router.post('/like/:blogId', BlogsService_1.likeBlog);
router.delete('/:id', BlogsService_1.deleteBlog);
module.exports = router;
//# sourceMappingURL=BlogsController.js.map