"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtStartegy_1 = require("../../Jwt/jwtStartegy");
const tagsService_1 = require("../Services/tagsService");
const router = express_1.default.Router({ mergeParams: true });
router.use(jwtStartegy_1.authMiddleware);
router.post('', tagsService_1.postTags);
exports.default = router;
//# sourceMappingURL=tagsController.js.map