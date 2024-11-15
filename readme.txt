# Validator Middleware Example

This project demonstrates how to use a custom `validator` middleware for validating API request payloads in an Express.js application.

## Features

- Validate request body fields based on rules defined in a configuration object.
- Supports various validation options, including required fields, minimum/maximum lengths, patterns, and more.
- Checks for valid MongoDB ObjectId in route parameters (`req.params.id`).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>


## Usage
Code Overview
The application uses a validator middleware to validate incoming request payloads for specific routes.

Example Route Validation
In this example, a POST route /get-all is validated using the following rules:

const getAllOptions = [
  { field: "username", message: "Username is required" },
  { field: "email", message: "Email is required", email: true },
  { field: "password", message: "Password is required", minLength: 8 },
];



##  Middleware Configuration
The options object maps routes to their respective validation rules:
const options = {
  "/get-all": getAllOptions,
};


## Applying the Middleware
The validator middleware is applied to the /get-all route:

app.post("/get-all", validator(options), (req, res) => {
  res.status(200).json({ message: "Validation passed!", data: req.body });
});


## Example response
{
  "errors": [
    { "field": "email", "message": "Email is required" },
    { "field": "password", "message": "Password is required" }
  ]
}

