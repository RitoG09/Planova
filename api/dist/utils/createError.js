"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};
exports.default = createError;
