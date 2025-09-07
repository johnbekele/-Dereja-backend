import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import passport from 'passport'
import logger from '../utils/logger.js'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import { PERMISSIONS } from '../middleware/roles.js'

dotenv.config()

const saltround = 10

//admin role functions

const createUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array({ onlyFirstError: true }).map((err) => ({
                    field: err.param,
                    message: err.msg,
                })),
            })
        }

        const {
            username,
            firstname,
            lastname,
            email,
            phone,
            address,
            password,
        } = req.body
        logger.log(req.body)

        // Check if user exists
        const userExists = await User.findOne({
            $or: [{ username }, { email }],
        })

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltround)

        //permission
        const permissions = PERMISSIONS[role] || []
        logger.log('Permissions:', permissions)

        // Create user
        const user = await User.create({
            username,
            firstname,
            lastname: lastname || '',
            email,
            phone,
            address,
            password: hashedPassword,
            role: role || 'Viewer',
        })

        logger.log('User created ', user.toJSON())
        res.status(201).json({ message: 'User created successfully', user })
    } catch (e) {
        logger.log('Error creating user ', e)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getUsers = async (req, res) => {
    console.log('Getting all users')
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Error getting users' })
    }
}
const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        const deleteUser = await User.findOneAndDelete({ _id: id })

        return res.status(200).json({
            message: 'User deleted successfully',
            user: deleteUser,
        })
    } catch (error) {
        console.error('Error deleting user:', error)
        return res.status(500).json({ message: 'Server error' })
    }
}

const freezUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        const freezuser = await User.findByIdAndUpdate(id, { freez: true })

        return res.status(200).json({
            message: 'User freezed successfully ',
            user: freezuser,
        })
    } catch (error) {
        console.error('Error freazing user', error)
        return res.status(500).json({ message: 'server errror ' })
    }
}

const unfreezUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        const freezuser = await User.findByIdAndUpdate(id, { freez: false })

        return res.status(200).json({
            message: 'User restore access successfully ',
            user: freezuser,
        })
    } catch (error) {
        console.error('Error restor user', error)
        return res.status(500).json({ message: 'server errror ' })
    }
}

const findUserProfile = async (req, res) => {
    const { userId } = req.params
    console.log(userId)
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' })
        }

        const userexists = await User.findOne({ _id: userId })

        if (!userexists) {
            console.log("user doesn't exist ")
            res.status(404).json({ message: 'Usernot found ' })
        }
        console.log('user', userexists)
        res.status(200).json(userexists)
    } catch (err) {}
}

const escalateUser = async (req, res) => {
    const { torole } = req.body
    const { id } = req.params
    logger.log(id)

    if (!['admin', 'moderator'].includes(torole.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid role' })
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }
        if (torole.toLowerCase() === 'admin') {
            user.role.Admin = Number(4001)
        } else if (torole.toLowerCase() === 'moderator') {
            user.role.Moderator = Number(3001)
        } else {
            return res.status(400).json({ message: 'Invalid role' })
        }
        await user.save()
        res.status(200).json({
            message: 'User role updated successfully',
            user,
        })
    } catch (e) {
        res.status(500).json({ message: 'Error updating', e })
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({
            role: {
                $in: ['Admin', 'SupportAgent', 'Dispatcher', 'FinanceOfficer'],
            },
        })
        res.status(200).json(employees)
    } catch (e) {
        res.status(500).json({ message: 'Error getting employees', e })
    }
}

export default {
    getUsers,
    createUser,
    escalateUser,
    deleteUser,
    freezUser,
    unfreezUser,
    findUserProfile,
    getEmployees,
}
