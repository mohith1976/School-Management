const db = require('../config/db');
const Joi = require('joi');

exports.addSchool = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        address: Joi.string().min(5).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, address, latitude, longitude } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        res.status(201).json({
            message: 'School added successfully',
            schoolId: result.insertId,
        });
    } catch (err) {
        console.error('DB Insert Error:', err);
        res.status(500).json({ error: 'Database insert failed' });
    }
};
