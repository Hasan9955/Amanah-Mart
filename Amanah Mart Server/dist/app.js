"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/utils/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/utils/notFound"));
const router_1 = require("./app/router/router");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
//Set Routes
app.use('/api', router_1.mainRoutes);
app.get('/', (req, res) => {
    res.send({
        message: 'Amanah Mart server is running successfully!'
    });
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
