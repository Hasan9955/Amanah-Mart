"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    access_secret: process.env.ACCESS_SECRET,
    access_exp: process.env.ACCESS_EXP,
    refresh_secret: process.env.REFRESH_SECRET,
    refresh_exp: process.env.REFRESH_EXP,
    reset_secret: process.env.RESET_SECRET,
    reset_exp: process.env.RESET_EXP,
    reset_link: process.env.RESET_LINK,
    app_email: process.env.APP_EMAIL,
    app_pass: process.env.APP_PASSWORD,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
