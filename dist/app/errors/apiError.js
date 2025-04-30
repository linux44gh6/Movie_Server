"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class apiError extends Error {
//   statusCode: number;
//   constructor(statusCode: number, message: string | undefined, stack = "") {
//       super(message)
//       this.statusCode = statusCode
//       if (stack) {
//           this.stack = stack
//       } else {
//           Error.captureStackTrace(this, this.constructor)
//       }
//   }
// }
// export default apiError
class ApiError extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
