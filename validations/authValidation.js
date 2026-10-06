const Joi = require("joi");

const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please provide a valid email",
            "any.required": "Email is required"
        }),

    newPassword: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters",
            "any.required": "New password is required"
        }),

    answer: Joi.string()
        .required()
        .messages({
            "any.required": "Answer is required"
        })
});

module.exports = {
    resetPasswordSchema
};