"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsService_1 = require("../Service/commentsService");
const jwtStartegy_1 = require("../../Jwt/jwtStartegy");
const router = express_1.default.Router({ mergeParams: true });
router.use(jwtStartegy_1.authMiddleware);
router.post('', commentsService_1.postComment);
router.patch('/:commentId', commentsService_1.editComment);
router.delete('/:commentId', commentsService_1.deleteComment);
router.post('/:commentId/reply', commentsService_1.postReply);
router.delete('/:commentId/reply/:replyId', commentsService_1.deleteReply);
exports.default = router;
//# sourceMappingURL=commentsController.js.map