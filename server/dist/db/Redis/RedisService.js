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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hdel = exports.hget = exports.hset = exports.getByKey = void 0;
const RedisConfig_1 = require("./RedisConfig");
const getByKey = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield RedisConfig_1.redisclient.get(name);
        return res;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getByKey = getByKey;
const hset = (key, obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield RedisConfig_1.redisclient.hSet(key, obj);
});
exports.hset = hset;
const hget = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield RedisConfig_1.redisclient.hGetAll(key);
    }
    catch (error) {
        console.log(error);
    }
});
exports.hget = hget;
const hdel = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield RedisConfig_1.redisclient.del(key);
    }
    catch (error) {
        console.log(error);
    }
});
exports.hdel = hdel;
//# sourceMappingURL=RedisService.js.map