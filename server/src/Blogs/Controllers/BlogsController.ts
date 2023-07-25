import express from 'express'
import {getAllBlogs, createBlog,updateBlog, deleteBlog,likeBlog} from '../Service/BlogsService'
import { validationMiddleware } from '../../Validation/validate';
import { CreateBlogDto, UpdateBlogDto } from '../Service/Dto/';
import {authMiddleware} from '../../Jwt/jwtStartegy';
const router = express.Router();


router.get('/', getAllBlogs);
router.use(authMiddleware)

router.post('/',validationMiddleware(CreateBlogDto), createBlog);
router.patch('/:id',validationMiddleware(UpdateBlogDto), updateBlog);
router.post('/like/:blogId', likeBlog)
router.delete('/:id', deleteBlog);

export =router;


