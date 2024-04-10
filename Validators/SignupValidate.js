const joi = require('joi');

const signupSchema = joi.object({
    userName: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[A-Z]).{8,}$/)).required(),
});

module.exports = {
    validate: function(data) {
        return signupSchema.validate(data);
    }
};

