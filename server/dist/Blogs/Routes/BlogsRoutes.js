"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogsController_1 = require("../Controller/BlogsController");
const validate_1 = require("../../Validation/validate");
const Dto_1 = require("../Dto");
const jwtStartegy_1 = require("../../Jwt/jwtStartegy");
const blogController = new BlogsController_1.BlogController();
const router = express_1.default.Router();
router.get('/allBlogs', blogController.getAllBlogs);
router.use(jwtStartegy_1.authMiddleware);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getAllBlogs);
router.post('/', (0, validate_1.validationMiddleware)(Dto_1.CreateBlogDto), blogController.createBlog);
router.patch('/:id', (0, validate_1.validationMiddleware)(Dto_1.UpdateBlogDto), blogController.updateBlog);
router.post('/like/:blogId', (0, validate_1.validationMiddleware)(Dto_1.LikeBlogDto), blogController.likeBlog);
router.delete('/:id', blogController.deleteBlog);
exports.default = router;
//# sourceMappingURL=BlogsRoutes.js.map