const express = require('express');
const db = require('../models')

// Create and Save a new User
exports.create = (req, res) => {
    const { userName, password, email } = req.body

    db.User.create({
        userName: userName,
        password: password,
        email: email
    }).then(data => {
        res.status(200).json({
            statusCode: 201,
            message: "User created successfully",
            data: data
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    db.User.findAll()
        .then(data => {
            res.status(200).json({
                statusCode: 200,
                message: "Data found",
                data: data
            })
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

// Find a single Users with an id
exports.findOne = (req, res) => {
    const { id } = req.params

    db.User.findByPk(id)
        .then(data => {
            res.status(200).json({
                statusCode: 200,
                message: "Data found",
                data: data
            })
        }).catch(err => {
            res.status(500).send(err)
        })
};

// Update a Users by the id in the request params
exports.update = (req, res) => {
    const { id } = req.params
    const { userName, password, email } = req.body

    db.User.update({
        userName: userName,
        password: password,
        email: email
    }, {
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            statusCode: 201,
            message: "User updated successfully",
            data: data
        })
    })
};

// Delete a Users with the specified id in the request params
exports.delete = (req, res) => {
    const { id } = req.params

    db.User.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json({
            statusCode: 204,
            message: "User deleted successfully"
        })
    }).catch(err => {
        res.status(500).send(err)
    })

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    db.User.destroy()
        .then(data => {
            res.status(200).json({
                statusCode: 204,
                message: "All User deleted successfully"
            })
        }).catch(err => {
            res.status(500).send(err)
        })
};

// ...