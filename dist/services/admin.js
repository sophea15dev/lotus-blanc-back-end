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
exports.adminService = void 0;
const auth_1 = require("../utils/auth");
// Replace this with a database call to your ADMIN table
const mockAdmins = [
    {
        admin_id: 1,
        email: "lotusblanc@email.com",
        password: "$2b$10$NhczuX4bRgRRRvh9Ob/1sOVZbnG010AikmHmcAgjMB90/zD23VItm", // '123123' hashed
    },
];
exports.adminService = {
    login: (email, pass) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = mockAdmins.find((a) => a.email === email);
        if (!admin)
            return null;
        const isMatch = yield auth_1.authUtils.comparePassword(pass, admin.password);
        if (!isMatch)
            return null;
        const token = auth_1.authUtils.generateToken(admin.admin_id);
        return {
            token,
            user: { id: admin.admin_id, email: admin.email },
        };
    }),
};
