"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
const validationLayer = (validations) => {
    return ([
        validations,
        (req, res, next) => {
            const errorsResult = (0, express_validator_1.validationResult)(req);
            if (!errorsResult.isEmpty()) {
                const errors = errorsResult.array().map((err) => {
                    return { field: err.path, message: err.msg };
                });
                return res.status(422).json({ errors });
            }
            next();
        }
    ]);
};
exports.registerValidation = validationLayer([
    (0, express_validator_1.body)("email").notEmpty().withMessage("email is required").isEmail().withMessage("Please provide a valid email."),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("firstName is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("lastName is required"),
]);
