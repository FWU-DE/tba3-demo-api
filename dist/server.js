"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const server = app_1.default.listen(PORT, () => {
    console.log(`🚀 TBA3 Demo API server running on http://${HOST}:${PORT}`);
    console.log(`📖 API documentation available at http://${HOST}:${PORT}/`);
    console.log(`🔍 OpenAPI specification at http://${HOST}:${PORT}/api-spec`);
    console.log(`📊 Available datasets at http://${HOST}:${PORT}/datasets`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
exports.default = server;
//# sourceMappingURL=server.js.map