const express = require('express');
const router = express.Router();
const { ApplicationUser } = require('../models/applicationsuser');
const ErrorResponse = require('../utils/errorResponse');
const validateRequest = require('../middleware/validateRequest');
const { Role } = require('../data/role');

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// Route Handlers

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// Validation Schemas
const Joi = require('joi');

function createSchema(req, res, next) {
    const schema = Joi.object({
        UserName: Joi.string().required(),
        fullname: Joi.string().required(),
        Email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        hard_skills: Joi.string().required(),
        soft_skills: Joi.string().required(),
        introduce_yourself: Joi.string().required(),
        position_user: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.Company, Role.User).required(''),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        UserName: Joi.string().optional(),
        fullname: Joi.string().optional(),
        Email: Joi.string().email().optional(),
        phoneNumber: Joi.string().optional(),
        city: Joi.string().optional(),
        address: Joi.string().optional(),
        date_of_birth: Joi.date().optional(),
        hard_skills: Joi.string().optional(),
        soft_skills: Joi.string().optional(),
        introduce_yourself: Joi.string().optional(),
        position_user: Joi.string().optional(),
        role: Joi.string().valid(Role.Admin, Role.Company, Role.User).optional(''),
    });
    validateRequest(req, next, schema);
}
