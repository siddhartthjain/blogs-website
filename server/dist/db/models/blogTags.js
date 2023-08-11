"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const blogs_1 = __importDefault(require("./blogs"));
const tags_1 = __importDefault(require("./tags"));
class BlogTags extends sequelize_1.Model {
}
BlogTags.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: blogs_1.default,
            key: "id"
        }
    },
    tagId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tags_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: config_1.default,
    modelName: "BlogTags",
});
blogs_1.default.belongsToMany(tags_1.default, {
    as: "blogTags",
    through: BlogTags,
    foreignKey: 'blogId',
    otherKey: 'tagId'
});
exports.default = BlogTags;
//# sourceMappingURL=blogTags.js.map