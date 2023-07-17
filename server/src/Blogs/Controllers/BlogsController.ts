import express from 'express'
import {getAllBlogs, createBlog,updateBlog, deleteBlog} from '../Service/BlogsService'
const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export =router;



