import express from 'express'
import { postComment, editComment, deleteComment, postReply, deleteReply } from '../Service/commentsService';
import {authMiddleware} from '../../Jwt/jwtStartegy';
const router= express.Router({ mergeParams: true }); 

router.use(authMiddleware);
router.post('',postComment)
router.patch('/:commentId',editComment)
router.delete('/:commentId', deleteComment)
router.post('/:commentId/reply',postReply)
router.delete('/:commentId/reply/:replyId',deleteReply)

export default router;