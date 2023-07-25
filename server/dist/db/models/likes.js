"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const user_1 = __importDefault(require("./user"));
const blogs_1 = __importDefault(require("./blogs"));
class Likes extends sequelize_1.Model {
}
Likes.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id'
        }
    },
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: blogs_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: config_1.default,
    modelName: 'Likes'
});
blogs_1.default.belongsToMany(user_1.default, {
    as: 'userliked',
    through: Likes,
    foreignKey: 'blogId',
    otherKey: 'userId', // The foreign key in the junction table referencing the Users model
});
user_1.default.belongsToMany(blogs_1.default, {
    as: 'blogsliked',
    through: Likes,
    foreignKey: 'userId',
    otherKey: 'blogId',
});
Likes.belongsToMany(blogs_1.default, {
    through: Likes,
    foreignKey: 'blogId',
    otherKey: 'userId',
});
Likes.belongsToMany(user_1.default, {
    through: Likes,
    foreignKey: 'userId',
    otherKey: 'blogId',
});
exports.default = Likes;
//# sourceMappingURL=likes.js.map