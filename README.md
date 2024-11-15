# Validator Middleware for Express

This is a simple validation middleware for Express.js that allows you to apply field validations on your route handlers. You can define validation rules in an easy-to-read object format, and the middleware will check the request's body (and `req.params` if needed) for errors before the route logic is executed.

## Features

- Field-level validation with various rules (`required`, `minLength`, `maxLength`, `email`, etc.).
- Support for custom validation logic.
- MongoDB ID validation for routes that require an ID parameter (`req.params.id`).
- Error handling with clear messages for invalid fields.
- Easy integration into Express.js route handlers.

## Installation
Here are the available validation rules you can use:

- required: Ensures the field is not empty.
- minLength: Ensures the field has at least the specified number of characters.
- maxLength: Ensures the field does not exceed the specified number of characters.
- min: Ensures the field value is greater than or equal to the specified number.
- max: Ensures the field value is less than or equal to the specified number.
- email: Validates if the field is a valid email address.
- pattern: Validates if the field matches a custom regular expression.
- numeric: Ensures the field value is a valid numeric value.
- boolean: Ensures the field value is a boolean.
- date: Ensures the field value is a valid date.
- custom: You can provide a custom validation function that returns true for valid - values or false for invalid values.

## Installation

You can install this package via npm:

```bash
npm install my-routes-validator


