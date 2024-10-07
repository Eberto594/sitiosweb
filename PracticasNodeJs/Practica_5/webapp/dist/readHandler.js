"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = (req, res) => {
    // res.json({
    //     message: "Hello, World"
    // });
    res.cookie("sessionID", "mysecretcode");
    req.pipe(res);
};
exports.readHandler = readHandler;
