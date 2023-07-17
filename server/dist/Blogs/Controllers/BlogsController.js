"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const BlogsService_1 = require("../Service/BlogsService");
const router = express_1.default.Router();
router.get('/', BlogsService_1.getAllBlogs);
router.post('/', BlogsService_1.createBlog);
router.patch('/:id', BlogsService_1.updateBlog);
router.delete('/:id', BlogsService_1.deleteBlog);
module.exports = router;
