const Joi = require('joi');

const tutorAuthSchema = Joi.object({
    id: Joi.number().integer(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().lowercase().required()
})

const studentAuthSchema = Joi.object({
    id: Joi.number().integer(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().lowercase().required()
})

const classAuthSchema = Joi.object({
    id: Joi.number().integer(),
    tutor_id: Joi.number().integer().required(),
    student_id: Joi.number().integer().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    class_fee_per_hour: Joi.number().precision(2).required(),
    discount_rate: Joi.number().precision(2).required()
})

const getClassRecordsAuthSchema = Joi.object({
    start_time: Joi.date().required(),
})

module.exports = {
    tutorAuthSchema,
    studentAuthSchema,
    classAuthSchema,
    getClassRecordsAuthSchema
}