const { db } = require('../config/db');
const Joi = require('joi');

exports.addSchool = (req, res) => {
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
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error('DB Insert Error:', err);
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
};
