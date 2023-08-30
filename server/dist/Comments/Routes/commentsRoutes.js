"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = __importDefault(require("../Controllers/commentsController"));
const jwtStartegy_1 = require("../../Jwt/jwtStartegy");
const router = express_1.default.Router({ mergeParams: true });
const commentsController = new commentsController_1.default();
router.use(jwtStartegy_1.authMiddleware);
router.post("", commentsController.postComment);
router.patch("/:commentId", commentsController.editComment);
router.delete("/:commentId", commentsController.deleteComment);
router.post("/:commentId/reply", commentsController.postReply);
router.delete("/:commentId/reply/:replyId", commentsController.deleteReply);
exports.default = router;
//# sourceMappingURL=commentsRoutes.js.map