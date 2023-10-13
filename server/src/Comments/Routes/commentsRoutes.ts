import express from "express";
import 
 CommentsController
 from "../Controllers/commentsController";
import { authMiddleware } from "../../Jwt/jwtStartegy";
const router = express.Router({ mergeParams: true });
const commentsController = new CommentsController()
router.use(authMiddleware);
router.post("", commentsController.postComment);
router.patch("/:commentId", commentsController.editComment);
router.delete("/:commentId", commentsController.deleteComment);
router.post("/:commentId/reply", commentsController.postReply);
router.delete("/:commentId/reply/:replyId", commentsController.deleteReply);

export default router; 
