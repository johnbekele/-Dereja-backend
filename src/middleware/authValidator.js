import { body } from 'express-validator';

 const createUserValidator = [
  body('username', 'Username is required').notEmpty().isString(),
  body('firstname', 'First name is required').notEmpty().isString(),
  body('lastname', 'Last name is required').notEmpty().isString(),
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

 const loginValidator = [
  body('identifier', 'Identifier (username or email) is required').notEmpty(),
  body('password', 'Password is required').exists(),
];

 const resetPasswordValidator = [
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a new password with 6 or more characters'
  ).isLength({ min: 6 }),
];


  export default {
    createUserValidator,
    loginValidator,
    resetPasswordValidator,
  };