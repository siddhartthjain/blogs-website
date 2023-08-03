import express from 'express'
import {getAllBlogs, createBlog,updateBlog, deleteBlog,likeBlog} from '../Service/BlogsService'
import { validationMiddleware } from '../../Validation/validate';
import { CreateBlogDto, UpdateBlogDto ,LikeBlogDto} from '../Service/Dto/';
import {authMiddleware} from '../../Jwt/jwtStartegy';
const router = express.Router();


router.get('/allBlogs', getAllBlogs);
router.use(authMiddleware)
router.get('/', getAllBlogs);
router.post('/',validationMiddleware(CreateBlogDto), createBlog);
router.patch('/:id',validationMiddleware(UpdateBlogDto), updateBlog);
router.post('/like/:blogId',validationMiddleware(LikeBlogDto),likeBlog)
router.delete('/:id', deleteBlog);

export =router;



