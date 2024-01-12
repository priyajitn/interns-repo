const joi = require('@hapi/joi');

// const authSchema = joi.object({
//     name: joi.string().required(),
//     email: joi.string().email().lowercase().required(),
// })

const authSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().email({
        minDomainSegments: 2, 
        tlds: { allow: ['com', 'net', 'in', 'design', 'co.in'] } 
    }).lowercase().required(),
});

module.exports = {
    authSchema
}