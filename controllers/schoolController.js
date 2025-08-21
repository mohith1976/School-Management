const db = require('../config/db');
const Joi = require('joi');
const calculateDistance = require('../utils/distance');

// Add School API
exports.addSchool = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            address: Joi.string().min(5).required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            // Pass validation error to global error handler
            return next({ status: 400, message: error.details[0].message });
        }

        const { name, address, latitude, longitude } = req.body;

        const [result] = await db.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        res.status(201).json({
            success: true,
            message: 'School added successfully',
            schoolId: result.insertId,
        });
    } catch (err) {
        // Pass DB errors to global error handler
        next(err);
    }
};

// List Schools API
exports.listSchools = async (req, res, next) => {
    try {
        const schema = Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        });

        const { error } = schema.validate(req.query);
        if (error) {
            return next({ status: 400, message: error.details[0].message });
        }

        const { latitude, longitude } = req.query;

        const [schools] = await db.query('SELECT * FROM schools');

        const schoolsWithDistance = schools.map((school) => ({
            ...school,
            distance: parseFloat(
                calculateDistance(
                    parseFloat(latitude),
                    parseFloat(longitude),
                    parseFloat(school.latitude),
                    parseFloat(school.longitude)
                )
            ).toFixed(2),
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            message: 'Schools fetched successfully',
            data: schoolsWithDistance,
        });
    } catch (err) {
        next(err);
    }
};
