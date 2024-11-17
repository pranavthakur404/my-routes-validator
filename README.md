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
- decimal2: Ensures the field value has up to 2 decimal places.
- decimal6: Ensures the field value has up to 6 decimal places.
- custom: You can provide a custom validation function that returns true for valid - values or false for invalid values.

## Example use

```javascript
import express from "express";
import bodyParser from "body-parser";
import { validator } from "my-routes-validator";

const app = express();
app.use(bodyParser.json());

const options = {
  "/custom-validation": [
    {
      field: "username",
      message: "Username is required",
      required: true,
    },
    {
      field: "age",
      message: "Age must be a valid number and greater than 18",
      required: true,
      custom: (value) => !isNaN(value) && value > 18,
    },
    {
      field: "password",
      message: "Password must include at least one special character",
      required: true,
      custom: (value) => /[!@#$%^&*]/.test(value),
    },
    {
      field: "number",
      message:
        "Number must have up to two decimal places and up to six decimal places",
      required: true,
      decimal2: true,
      decimal6: true,
    },
  ],
};

app.post("/custom-validation", validator(options), (req, res) => {
  res.status(200).json({ message: "Validation passed!", data: req.body });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

## Installation

You can install this package via npm:

```bash
npm install my-routes-validator
```
