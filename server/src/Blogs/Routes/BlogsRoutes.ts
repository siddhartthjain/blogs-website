import express from 'express'
import {  BlogController} from '../Controller/BlogsController'
import { validationMiddleware } from '../../Validation/validate';
import { CreateBlogDto, UpdateBlogDto ,LikeBlogDto} from '../Dto';
import {authMiddleware} from '../../Jwt/jwtStartegy';
import { get } from 'http';
const blogController= new BlogController();
const router = express.Router();

router.get('/allBlogs',blogController.getAllBlogs );
router.use(authMiddleware)
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getAllBlogs);
router.post('/',validationMiddleware(CreateBlogDto), blogController.createBlog);
router.patch('/:id',validationMiddleware(UpdateBlogDto), blogController.updateBlog);
router.post('/like/:blogId',validationMiddleware(LikeBlogDto),blogController.likeBlog);
router.delete('/:id', blogController.deleteBlog);



export default router;



