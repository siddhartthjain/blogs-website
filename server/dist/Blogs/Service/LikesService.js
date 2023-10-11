"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const likes_1 = __importDefault(require("../../db/models/likes"));
class LikesService {
    constructor() {
        this.createLike = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { userId, blogId } = inputs;
            try {
                yield likes_1.default.create({ userId, blogId });
                return true;
            }
            catch (error) {
                console.log(error);
                throw new Error("not abel to Like blog");
            }
        });
        this.destroyIfBlogIdUserId = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { blogId, loggedUserId } = inputs;
            return yield likes_1.default.destroy({
                where: {
                    [sequelize_1.Op.and]: [{ blogId: blogId }, { userId: loggedUserId }],
                },
            });
        });
    }
}
exports.default = LikesService;
//# sourceMappingURL=LikesService.js.map